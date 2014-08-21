define([

	'jquery',

	'underscore',

	'backbone',

	'app/utils/global_events',

	'app/utils/server_utils',

	'text!/site/resources/templates/controls/multi_select_control.html'

], function($, _, Backbone, GlobalEvents, serverUtils, MultiSelectControlTemplate) {

	var MultiSelectControl = Backbone.View.extend({

		className: 'multi-select-control',

		defaults: {

			// Label formatting can be overridden as option
			fnFormatItemLabel: function(item) { return item.name || item.id; },

			fnGetItemId: function(item) { return item.id; },

			filterAttrs: [ 'nameFirst', 'nameLast' ],

			// Defaults for internal state
			_state: {

	          // Apply a filter to the collection
	          filterFunction: null,

	          selectedCount: 0,

	          // Dirty once an item check/unchecked changes
	          isDirty: false,

	          showCheckedItemsOnly: false,

	          mode: 'read-only'

			}

		},

		events: {

			"click .js-btn-item": "_handleBtnClick",

			"click .js-data-item": "_handleDataItemClick",

			"click .js-show-items-checked": "_toggleCheckedOnly",

			"click .js-filter-remove": "_clearFilter",

			"keyup .js-filter": "_handleFilterChange"

		},
		
		initialize: function(options) {

			_.extend(this, this.defaults, options)

			// Bind this to callbacks
			_.bindAll(this, "render", "_refreshCssFlags", "_handleBtnClick", "_handleModeChange", "_handleCheckedOnlyChange", "_handleFilterChange", "_refreshSelectedCount", "_toggleCheckedOnly");


			// Helps make test easier
			this.tmpl = MultiSelectControlTemplate;

			// Retain original selections in case cancel is used after changes
			this.tmpSelectedIds = [];


			// First, filter the results down, then update the UI based on it.
			this.doFilter = _.compose(

				this._refreshItemsUI, 

				function(results) {

					return results;

				},

				this._filter);

			if (!this.model) return;

			// Apply defaults
			this.model.set( _.defaults(this.model.toJSON(), this.defaults._state) );

			// Map refreshing of UI to model attr changes
			this.listenTo(this.model, 'change:mode', this._refreshCssFlags);

			this.listenTo(this.model, 'change:mode', this._handleModeChange);

			this.listenTo(this.model, 'change:isDirty', this._refreshCssFlags);

			this.listenTo(this.model, 'change:selectedCount', this._refreshSelectedCount);

			this.listenTo(this.model, 'change:showCheckedItemsOnly', this._refreshCssFlags);

			this.listenTo(this.model, 'change:showCheckedItemsOnly', this._handleCheckedOnlyChange);

			this.listenTo(this.model, 'change:filterQuery', function(model, query) {

				this.doFilter(query, this.filterAttrs);

				this._refreshCssFlags();

			});

		},

		render: function() {

			var json = _.extend(this.model.toJSON(), { 

				list: this.collection.toJSON(), 

				fnFormatItemLabel: this.fnFormatItemLabel, 

				fnGetItemId: this.fnGetItemId 

			});

			// Set for initial render
			this.model.set({ selectedCount: this._getSelectedItems().length });

			// Passing in template arg used to facilitate testing
			this.$el.html(_.template(this.tmpl, json));

			// Set initial selected
			this.tmpSelectedIds = _.map(this._getSelectedItems(), function(item) { return json.fnGetItemId( item.toJSON() ); });

			this._refreshSelectedCount();

			// Defer allows render to be attached to DOM before css refresh
			_.defer(this._refreshCssFlags);

			return this;
		},

		// Composed of multiple functions. See initiale function for implementation
		doFilter: function() {},

		// Set the selected items by an array of ids
		setSelectedItemsById: function(ids) {

			ids || (ids = []);

			// First reset selected attr
			var selectedItems = _.chain(this.collection.models)

								 // Issue with using 'each' in chain, use map as work around
								 .map(function(item) { return item.set({ selected: false }); })

								 // Only include items that appears in the array of ids
								 .filter(function(item) { 

								 		var id = this.fnGetItemId(item.toJSON());

									 	return _.contains(ids, id); 

									 }, this)

								 .map(function(item) { return item.set({ selected: true }); })

								 .value();

			return selectedItems;

		},

		mode: function() {

			return this.model.get('mode');
		},

		_handleBtnClick: function(arg) { // arg is mouseevent or string

			if (arg.currentTarget) arg.preventDefault();

			// Get mode from data attribute of dom element
			var mode = arg.currentTarget && $(arg.currentTarget).data('mode') || arg;

			// Don't process clicks on disabled btn
			if (arg.currentTarget && $(arg.currentTarget).hasClass('disabled')) return;

			// Trigger callback after item selection confirmed
			if (arg.currentTarget && $(arg.currentTarget).hasClass('js-use-items') && this.fnSelectionChange) {

				this.fnSelectionChange(this._getSelectedItems());

			}

			else if (arg.currentTarget && $(arg.currentTarget).hasClass('js-cancel')) {

				this._revertSelectedItems();

			}

			// Keep this last so that no events are triggered until above state is done
			this.model.set({ mode: mode });

		},

		_handleCheckedOnlyChange: function(model, val) { 

			this.$('.js-filter').prop('disabled', val);

		},

		// Cannot be done by pure css since rows are being hidden at times
		_stripeTableRows: function(model, val) { 

			// Reset
			this.$('.js-striped tr').removeClass(MultiSelectControl.STYLE.STRIPED);

			this.$('.js-striped tr:visible:even').addClass(MultiSelectControl.STYLE.STRIPED);

		},

		_handleDataItemClick: function(arg) { // arg is mouseevent or string

			// Get id from data attribute of dom element
			var id = arg.currentTarget && $(arg.currentTarget).data('id') || arg,

				itemModel = this._getItemById(id),

				items;

			// Ignore if not in edit select mode
			if (this.mode() !== MultiSelectControl.MODE.EDIT_SELECT) return;

			// Keep ui in line with model
			this.$('#' + id).toggleClass(MultiSelectControl.STYLE.SELECTED);

			this._toggleItemSelected(itemModel);

			items = this._getSelectedItems();

			this.model.set({ selectedCount: items.length, isDirty: true });

		},

		_handleFilterResultsChange: function(results) { 

			this.model.set({ filterResults: results.toJSON() });

			return results;
		},

		_storeSelectedIds: function() { 

			this.tmpSelectedIds = _.chain(this._getSelectedItems())

								   .map(function(item) { return this.fnGetItemId(item.toJSON()); }, this)

								   .value();

		},

		_revertSelectedItems: function() { 

			this.setSelectedItemsById(this.tmpSelectedIds);

		},

		_handleModeChange: function(model, mode) {

			if (mode === MultiSelectControl.MODE.EDIT_SELECT) {

				// Reset filter
				this._clearFilter();

				// Reset 'show checked only'
				this.model.set({ showCheckedItemsOnly: false });

				// Flag the original selections in case cancel is done
				this._storeSelectedIds();

			}

			if (mode === MultiSelectControl.MODE.EDIT_DEFAULT) {

				var selectedItems = _.map(this._getSelectedItems(),function(item) { return this.fnGetItemId(item.toJSON()); }, this),

					temp = this.tmpSelectedIds,

					isEqual = _.isEqual(selectedItems, this.tmpSelectedIds);

				// If it's already dirty, skip this step... remain dirty.
				if (this.model.get('isDirty') !== true) this.model.set({ isDirty: !isEqual });

				this.render();

				this._refreshCssFlags();

			}

			//// Callbacks ////

			// Standard Callbacks for mode
			if (mode === MultiSelectControl.MODE.EDIT_SELECT && this.fnEnterEditSelectMode) this.fnEnterEditSelectMode();

			if (mode === MultiSelectControl.MODE.EDIT_DEFAULT && this.fnEnterEditDefaultMode) this.fnEnterEditDefaultMode();

		},

		_handleFilterChange: function(ev) {

			var q = $(ev.currentTarget).val();

			this.model.set({ filterQuery: q });

		},

		_clearFilter: function(ev) {

			this.$('.js-filter').val('');

			this.model.set({ filterQuery: '' });

			this.doFilter('', this.filterAttrs);

		},

		_resetItems: function() {

			// Show all items
			_.each(this.collection.models, function(item) { item.set({ hide: false }); });

			return this.collection.models;

		},

		_filter: function(q, attrs) {

			attrs || (attrs = []);

			var results = _.chain(this.collection.models)

						   .filter(this._hideItem)

						   .filter(function(item) {

							   		var json = item.toJSON(),

							   			full = _.map(attrs, function(attr) { return json[attr] ; }).join(" ");

							   		return full.match(new RegExp("\\b" + q + "[^\\b]*?\\b", "gi"));

							   }, this)

						   .value();

			return results;

		},

		_hideItem: function(item) {

	   		// Reset
		   	return item.set({ hide: false });

	   },

		_toggleItemSelected: function(model) { 

			var b = model.get('selected') === true ? false : true;

			return model.set({ selected: b });

		},

		_toggleCheckedOnly: function(ev) { 

			var b = this.model.get('showCheckedItemsOnly') === true ? false : true;

			return this.model.set({ showCheckedItemsOnly: b });

		},

		_getSelectedItems: function(model) { 

			var items = _.chain(this.collection.models)

						.filter(function(item) {

							// Use the fn in case attr is not actually 'id' (example: 'userId')
							return item.get('selected') === true;

						}, this)

						.value();

			return items;

		},

		_getItemById: function(id) { // arg is mouseevent or string

			// Find first item that matches id
			var item = _.chain(this.collection.models)

						.find(function(item) {

							// Use the fn in case attr is not actually 'id' (example: 'userId')
							return this.fnGetItemId(item.toJSON()) === id;

						}, this)

						.value();

			return item;

		},

		// Hide/show items based on model's 'hide' attr
		_refreshItemsUI: function(filteredItems) {

			// Reset UI
			this.$('.js-data-item').addClass(MultiSelectControl.STYLE.HIDE);

			// Show/hide dome elements
			_.each(filteredItems, this._refreshItemDOM, this);

		},

		_refreshItemDOM: function(item) {

			var json = item.toJSON(),

				id = this.fnGetItemId(json), 

				isHidden = item.get('hide');

			this.$('#' + id).removeClass(MultiSelectControl.STYLE.HIDE);

			return item;

		},

		_refreshSelectedCount: function() {

			var n = this.model.get('selectedCount');

			this.$('.js-lbl-selected em').html(n);

			this._refreshCssFlags();

		},

		_refreshCssFlags: function() {

			this.$el

				.removeClass( _.values(MultiSelectControl.MODE).join(" ") )

				.addClass( this.mode() )

				.addClass( this.model.get('isDirty') === true ? MultiSelectControl.MODE.IS_DIRTY : '' )

				.addClass( this._getSelectedItems().length === 0 ? MultiSelectControl.MODE.NO_SELECTION : MultiSelectControl.MODE.HAS_SELECTION )

				.addClass( !_.isEmpty(this.model.get('filterQuery')) ? MultiSelectControl.MODE.FILTER_ACTIVE : '' )

				.addClass( this.model.get('showCheckedItemsOnly') === true ? MultiSelectControl.MODE.DISPLAY_ITEMS_CHECKED_ONLY : '' );

			this._stripeTableRows();

			// Disable 'use' btn until a change is made
			this.$('.js-use-items').toggleClass('disabled', !this.model.get('isDirty'));

		}

	});
	
	MultiSelectControl.STYLE = {

		HIDE: 'hide',

		SELECTED: 'checked',

		STRIPED: 'striped'

	};

	MultiSelectControl.MODE = {

		// No changes possible, just a list of names
		READ_ONLY: 'read-only',

		// Showing just list of names & and 'edit' btn to switch into selection mode
		EDIT_DEFAULT: 'edit-view',

		// Showing list of names with selection option
		EDIT_SELECT: 'edit-select',

		// Tells if there's at least one item selected
		HAS_SELECTION: 'has-selection',

		// No items selected
		NO_SELECTION: 'no-selection',

		// No items selected
		IS_DIRTY: 'is-dirty',

		DISPLAY_ITEMS_CHECKED_ONLY: 'items-checked-only',

		// If here's a query typed in the filter box
		FILTER_ACTIVE: 'filter-active',

		// No matching results to the term in filter box
		NO_FILTER_RESULTS: 'no-filter-results'

	};

	return MultiSelectControl;

});

<div class="bd">

	<div class="header">

		<div class="filterbox">

			<input class="js-filter" type="text" placeholder="filter by name" />

			<span class="js-filter-remove">x</span>

		</div>

		<label class="js-lbl-message">Unsaved...</label>

	    <label class="js-lbl-selected"><em><%= selectedCount %></em> selected</label>

	    <label class="js-filter-clear js-filter-remove"><span class="close-x">x</span>Clear Filter</label>

	</div>

	<div class="tbl-div">

		<table class="js-striped backgrid">

			<tbody>

				<% _.each(list, function(item) { %>

					<tr id="<%= fnGetItemId(item) %>" class="js-data-item <%= item.selected === true ? 'checked' : '' %>" data-id="<%= fnGetItemId(item) %>"><td><%= fnFormatItemLabel(item) %></td></tr>

				<% }) %>

			</tbody>

		</table>

		<div class="tbl-message">No items are currently checked. <label class="lbl-view-all-items js-show-items-checked">View all items</label>.</div>

	</div>

	<ul class="display-options">

		<li class="js-show-items-checked">Show checked only</li>
		
	</ul>

	<div class="btns">

		<a class="js-btn-item js-add-items k-button small light-gray" data-mode="edit-select"><span class="text-layer lighter">add collaborators</span></a>
		
		<a class="js-btn-item js-select-items k-button small light-gray" data-mode="edit-select"><span class="text-layer lighter">select</span></a>

		<a class="js-btn-item js-use-items k-button small light-gray disabled" data-mode="edit-view"><span class="text-layer lighter">use</span></a>

		<a class="js-btn-item js-cancel k-button small light-gray" data-mode="edit-view"><span class="text-layer lighter">back</span></a>

	</div>

</div>
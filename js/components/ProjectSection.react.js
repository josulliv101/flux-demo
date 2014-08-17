/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @jsx React.DOM
 */

var React             = require('react'),
    ProjectStore      = require('../stores/ProjectStore'),
    ProjectListItem   = require('../components/ProjectListItem.react'),
    cx                = require('react/lib/cx');

function getStateFromStores() {

  return {

    projects: ProjectStore.getAll(),

    isLoading: ProjectStore.isLoading()
    
  };
}

var ProjectSection = React.createClass({

  getInitialState: function() {

    return getStateFromStores();

  },

  componentDidMount: function() {

    ProjectStore.addChangeListener(this._onChange);

  },

  componentWillUnmount: function() {

    ProjectStore.removeChangeListener(this._onChange);

  },

  render: function() {

    var total,

        projectListItems = this.state.projects.map(function(project, i) {

          return ( <ProjectListItem key={project.id} index={i} name={project.name} count={ ProjectStore.getCount() } /> );

        });

    total = this.state.projects.length;

    return (
      <div
        className={cx({
          'project-section': true,
          'is-loading': this.state.isLoading
      })}>
          <div className="spinner"></div>
          <h4>Projects ({total})</h4>
          <ul className="project-list">
            {projectListItems}
          </ul>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {

    this.setState(getStateFromStores());

  }

});

module.exports = ProjectSection;

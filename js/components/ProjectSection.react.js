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
    MessageStore      = require('../stores/MessageStore'),
    ProjectStore      = require('../stores/ProjectStore'),
    ProjectListItem   = require('../components/ProjectListItem.react'),
    ThreadListItem    = require('../components/ThreadListItem.react'),
    ThreadStore       = require('../stores/ThreadStore'),
    UnreadThreadStore = require('../stores/UnreadThreadStore');

function getStateFromStores() {
  return {
    projects: ProjectStore.getAll()
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

    var projectListItems = this.state.projects.map(function(project) {

      return ( <ProjectListItem key={project.id} name={project.name} /> );

    }),

      total = this.state.projects.length;

    return (
      <div className="project-section">
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

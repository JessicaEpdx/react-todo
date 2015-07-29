var TodoBox = React.createClass({
  getInitialState: function() {
    return {
      data:
      [
        {title: "pick nose", description: "insert finger into left nostril, then right."},
        {title: "play videogames", description: "pick up thenm sticks!"}
      ]};
  },
  addData: function(task) {
    var tasks = this.state.data;
    tasks.push(task);
    this.setState({data: tasks});
  },
  render: function() {
    return (
      <div className="todoBox">
        <TodoForm addDataz={this.addData} />
        <TaskList taskData={this.state.data} />
      </div>
    );
  }
});

var TodoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    if (!title || !description) {
      alert("Both fields must be filled in!")
      React.findDOMNode(this.refs.title).value = title;
      React.findDOMNode(this.refs.description).value = description;
      return;
    }
    this.props.addDataz({title: title, description: description});
    React.findDOMNode(this.refs.title).value="";
    React.findDOMNode(this.refs.description).value="";
  },
  render: function() {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit}>
        <input type="text" ref="title" placeholder="Enter Task Name" />
        <input type="text" ref="description" placeholder="Describe Task"/>
        <input type="submit" value="Add Task" />
      </form>
    );
  }
});

var TaskList = React.createClass({
  render: function() {
    var tasks = this.props.taskData.map(function(task){
      return(
        <Task tasktitle={task.title} taskdescription={task.description} />
      );
    })
    return (
      <div className="taskList">
        {tasks}
      </div>
    );
  }
});

var Task = React.createClass({
  render: function() {
    return(
      <div className="task">
        <h3>{this.props.tasktitle}</h3>
        {this.props.taskdescription}
      </div>
    );
  }
});

React.render(
  <TodoBox />,
  document.getElementById('todoBox')
);

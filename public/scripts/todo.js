var TodoBox = React.createClass({
  getInitialState: function() {
    return {
      data:
      [
        {title: "pick nose", description: "insert finger into left nostril, then right.", id: 1},
        {title: "play videogames", description: "pick up thenm sticks!", id: 2}
      ]};
  },
  addData: function(task) {
    var tasks = this.state.data;
    var newID = tasks.length +1;
    task.id = newID;
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
        <Task tasktitle={task.title} taskdescription={task.description} id={task.id} />
      );
    });
    return (
      <div className="taskList">

        {tasks}
      </div>
    );
  }
});

var Task = React.createClass({
  getInitialState: function() {
    return{
      completed: false,
    }
  },
  complete: function(){
    if(this.state.completed){
      this.setState({completed:false});
      // $("#"+this.props.id).removeClass('finished')

    }else{
      this.setState({completed: true});
      // $("#"+this.props.id).addClass('finished')

    }
  },
  render: function() {
    if (this.state.completed) {
      return(
        <div className="completed finished" id={this.props.id} onClick={this.complete}>
          <h3 className="title"> {this.props.tasktitle} </h3>
          {this.props.taskdescription}<br />
          {this.state.completed.toString()}
        </div>
      );
    }else{
      return(
        <div className="incomplete" id={this.props.id.toString()} onClick={this.complete}>
          <h3 className="title"> {this.props.tasktitle} </h3>
          {this.props.taskdescription}<br />
          {this.state.completed.toString()}
        </div>
      );
    }
  }
});

React.render(
  <TodoBox />,
  document.getElementById('todoBox')
);

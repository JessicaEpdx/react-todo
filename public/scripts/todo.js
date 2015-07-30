var TodoBox = React.createClass({
  getInitialState: function() {
    return {
      data:
      [
        {title: "learn react", description: "its crazy", id: 1},
        {title: "play videogames", description: "pick up them sticks!", id: 2}
      ]};
  },
  addData: function(task) {
    var tasks = this.state.data;
    var newID = tasks.length +1;
    task.id = newID;
    tasks.push(task);
    $('.notice').html("")
    $('.showForm').slideDown();
    $('.todoForm').slideUp();
    this.setState({data: tasks});
  },
  showForm: function(e) {
    e.preventDefault();
    $('.showForm').hide();
    $('.todoForm').fadeIn();
  },
  render: function() {
    return (
      <div className="todoBox">
      <div className="btn btn-danger showForm" onClick={this.showForm}>Add Task</div>
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
      <div className="formdiv">
        <form className="todoForm" onSubmit={this.handleSubmit}>
          <input  className="input" type="text" ref="title" placeholder="Enter Task Name" /><br />
          <input  className="input" type="text" ref="description" placeholder="Describe Task"/><br />
          <input className="form-control input" type="submit" value="Add Task" className="btn btn-danger" />
        </form>
      </div>
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
        <div className="notice">
        </div>
        {tasks}
      </div>
    );
  }
});

var Task = React.createClass({
  getInitialState: function() {
    return{
      completed: false
    }
  },
  complete: function(){
    if(this.state.completed){
      this.setState({completed:false});
      $('.notice').html("")
      $("#"+this.props.id).removeClass('finished')
      $("#"+this.props.id).addClass('unfinished')

    }else{
      this.setState({completed: true});
      $("#"+this.props.id).addClass('finished')
      $("#"+this.props.id).removeClass('unfinished')
    }
    if(!$('.unfinished').length){
      $('.notice').html("<h4>Great job you completed all of your tasks!</h4>")
    }
  },
  render: function() {
      return(
        <div className="task unfinished well" id={this.props.id}>
          <h3 className="title" onClick={this.complete}> {this.props.tasktitle} </h3>
          {this.props.taskdescription}<br />
        </div>
      );
  }
});

React.render(
  <TodoBox />,
  document.getElementById('todoBox')
);

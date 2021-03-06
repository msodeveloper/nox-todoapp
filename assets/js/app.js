Nox('App',
  'App.Views.todoInput',
  'App.Views.todoMessage',
  function(app, todoInput, todoMessage) {
    app.fn.initialize = function(wrapper) {
      this.wrapper = wrapper;

      this.todoInput = new todoInput(this.wrapper.querySelector('#todo-input'));
      this.todos = [];

      this.addListeners();
    };

    app.fn.addListeners = function() {
      this.todoInput.on('newTodo', this.addTodo.bind(this));

      this.wrapper.querySelector('.remove-all-todos').addEventListener('click', this.removeAll.bind(this));
    };

    app.fn.addTodo = function(value) {
      var newTodo = new todoMessage(value);

      this.todos.push(newTodo);

      this.wrapper.querySelector('#todo-messages').appendChild(newTodo.render());

      newTodo.on('removeTodo', this.removeTodo.bind(this, newTodo));
    };

    app.fn.removeTodo = function(todo) {
      todo.el.parentNode.removeChild(todo.el);
    };

    app.fn.removeAll = function() {
      this.todos.forEach(function(todo) {
        todo.el.parentNode.removeChild(todo.el);
      });

      this.todos = [];
    };
  }
);
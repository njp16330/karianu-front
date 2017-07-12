import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class IngredientsList extends Component{
	constructor (props){
		super(props);

		this.state = {ingredients: []};
	}

	componentWillReceiveProps(props) {
	} 
	componentDidMount(){
		var that = this;
		fetch('/api/ingredients', {
		  	credentials: 'include'
		})
		.then(function (res) {  
			res.json().then(function(data){
				that.setState({ ingredients: data.data });
			});
		})  
		.catch(function (error) {  
			console.log('Request failed', error);  
			that.setState({ ingredients: [] });
		});
	}
	
	render (){
		var list = this.state.ingredients.map(function(v){
			return <li key={v.id.toString()} className="list-group-item">{v.name} | {v.description} | {v.category}</li>
		});
		return (<div>
		<div><h3>All Ingredients</h3></div>
		<ul className="list-group">
			{list}
		</ul></div>);
		
	}
}

class SetIngredient extends Component {
	constructor(props){
		super(props);

		this.state = {ingredient: (props.ingredient || {name: '', description: '', category: ''})};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e){
		var ingredient = this.state.ingredient;

		ingredient[e.target.name] = e.target.value;
		this.setState({
			ingredient: ingredient
		});
	}
	handleSubmit(e){
		var that = this, id = that.state.ingredient.id;
		fetch('/api/ingredients' + (id ? ('/' + id) : ''), {
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: id ? 'PUT' : 'POST',
		    body: JSON.stringify(that.state.ingredient)

		}).then(function (res) {  
			//refresh ingredient list
			res.json().then(function(data){
				if(data.status === "success"){
					alert('Ingredient Created');
					that.setState({name: '', description: '', category: ''});
				}
				else {
					alert(data.message);
				}
			});
		})  
		.catch(function (error) {  
			console.log('Request failed', error); 
		});

		e.preventDefault();
	}
	render(){
		return (<form onSubmit={this.handleSubmit}>
			<h1></h1>
			<div className="form-group">
    			<label htmlFor ="name">Name</label>
				<input placeholder="Enter Ingredient Name" className="form-control" type="text" id="name" name="name" onKeyUp={this.handleChange} onChange={this.handleChange} />
  			</div>
  			<div className="form-group">
    			<label htmlFor ="description">Description</label>
				<textarea placeholder="Enter Ingredient Description" className="form-control" id="description" name="description" onKeyUp={this.handleChange} onChange={this.handleChange}></textarea>
  			</div>
  			<div className="form-group">
    			<label htmlFor ="category">Category</label>
				<input placeholder="Enter Ingredient Category" className="form-control" type="text" id="category" name="category" onKeyUp={this.handleChange} onChange={this.handleChange} />
  			</div>
  			<button type="submit" className="btn btn-default">Create</button>
		</form>);
	}
}

class RecipesList extends Component{
	constructor (props){
		super(props);

		this.state = {recipes: []};
	}

	componentWillReceiveProps(props) {
	} 
	componentDidMount(){
		var that = this;
		fetch('/api/recipes')
		.then(function (res) {  
			res.json().then(function(data){
				that.setState({ recipes: data.data });
			});
		})  
		.catch(function (error) {  
			console.log('Request failed', error);  
			that.setState({ recipes: [] });
		});
	}
	
	render (){
		var list = this.state.recipes.map(function(v){
			return <li key={v.id.toString()} className="list-group-item">{v.name} | {v.description} | {v.category}</li>
		});
		return (<div>
		<div><h3>All Recipes</h3></div>
		<ul className="list-group">
			{list}
		</ul></div>);
		
	}
}

class SetRecipe extends Component {
	constructor(props){
		super(props);

		this.state = {recipe: (props.recipe || {name: '', description: '', category: ''})};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e){
		var recipe = this.state.recipe;

		recipe[e.target.name] = e.target.value;
		this.setState({
			recipe: recipe
		});
	}
	handleSubmit(e){
		var that = this, id = that.state.recipe.id;
		fetch('/api/recipes' + (id ? ('/' + id) : ''), {
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: id ? 'PUT' : 'POST',
		    body: JSON.stringify(that.state.recipe)

		}).then(function (res) {  
			//refresh ingredient list
			res.json().then(function(data){
				alert(data.message);
				alert('Recipe Created');
				that.setState({name: '', description: '', category: ''});
			});			
		})  
		.catch(function (error) {  
			console.log('Request failed', error); 
		});

		e.preventDefault();
	}
	render(){
		return (<form onSubmit={this.handleSubmit}>
			<h1></h1>
			<div className="form-group">
    			<label htmlFor ="name">Name</label>
				<input placeholder="Enter Recipe Name" className="form-control" type="text" id="name" name="name" onKeyUp={this.handleChange} onChange={this.handleChange} />
  			</div>
  			<div className="form-group">
    			<label htmlFor ="description">Description</label>
				<textarea placeholder="Enter Recipe Description" className="form-control" id="description" name="description" onKeyUp={this.handleChange} onChange={this.handleChange}></textarea>
  			</div>
  			<div className="form-group">
    			<label htmlFor ="category">Category</label>
				<input placeholder="Enter Recipe Category" className="form-control" type="text" id="category" name="category" onKeyUp={this.handleChange} onChange={this.handleChange} />
  			</div>
  			<button type="submit" className="btn btn-default">Create</button>
		</form>);
	}
}

class Tabstrip extends Component {
	constructor(props){
		super(props);

		this.state = {
			activeTab: 0,
			tabs: {
				0: <IngredientsList></IngredientsList>,
				1: <SetIngredient></SetIngredient>,
				2: <RecipesList></RecipesList>,
				3: <SetRecipe></SetRecipe>
			}
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e){
		var li = e.target.parentElement;
		console.log(li.tagName);
		if((li.tagName || '').toLowerCase() == 'li'){
			this.setState({
				activeTab: parseInt(li.getAttribute('data-index'))
			});
		}
	}
	render(){
		
		return (<div>
		<ul className="nav nav-tabs" onClick={this.handleChange}>
		  <li data-index="0" className={this.state.activeTab == 0 ? "active" : ""}><a href="#">Ingredients</a></li>
		  <li data-index="1" className={this.state.activeTab == 1 ? "active" : ""}><a href="#">Create Ingredient</a></li>
		  <li data-index="2" className={this.state.activeTab == 2 ? "active" : ""}><a href="#">Recipes</a></li>
		  <li data-index="3" className={this.state.activeTab == 3 ? "active" : ""}><a href="#">Create Recipe</a></li>
		</ul>

		<div className="tab-content">
			{
				this.state.tabs[this.state.activeTab]
			}
		</div>
		</div>);
	}
}

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <div className="App-header">
          <h2>Welcome to Karianu</h2>
        </div>
        <div className="App-body">
        	<Tabstrip></Tabstrip>
        </div>
      </div>
    );
  }
}

export default App;
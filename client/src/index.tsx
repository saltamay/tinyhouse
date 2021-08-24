import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Host, Listing, Listings, NotFound, User } from './sections';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './styles/index.css';

const client = new ApolloClient({
	uri: '/api',
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/host' component={Host} />
				<Route exact path='/listings/:id' component={Listing} />
				<Route exact path='/listings/:location?' component={Listings} />
				<Route exact path='/user/:id' component={User} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

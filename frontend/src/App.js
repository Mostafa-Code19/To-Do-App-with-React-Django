import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Index from './components/index'

const App = () => {
    return (
        <React.Fragment>

            <Suspense fallback={ <div>Loading...</div> }>

                <Router>

                    <Switch>
                        <Route path='/' exact component={Index} />
                    </Switch>

                </Router>

            </Suspense>
        </React.Fragment>
    );
}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

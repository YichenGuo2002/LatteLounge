import {Router, Route, Link} from 'react-router-dom'
import Home from './component/index'

React.render((
        <Router>
                <Route index element = {<Home />} /> 
        </Router>
    ), document.body)
import React, { Component } from 'react';
import NavBarApp from '../navbar/NavBarApp';

class Home extends Component {

    constructor() {
        // On appelle le constructeur parent
        super();
        this.user = JSON.parse(localStorage.getItem('userLogged'));
        this.gender = this.getGender(this.user.sexe);
    }

    getGender(sexe) {
        let gender = 'Mr';
        if (sexe === 'Femme') {
            gender = 'Mlle';
        }
        return gender;
    }

    render() {
        return (
            <div>
                {/* On passe les propriétés au component */}
                <NavBarApp user={this.user} gender={this.gender} />
            </div>
        );
    }
}

export default Home;
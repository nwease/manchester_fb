import React, {Component} from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from "../../ui/FormField";
import { validate } from "../../ui/miscellaneous";
import {firebasePlayers, firebaseDB, firebase} from "../../../firebase";

class EditPlayers extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastName: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Last Name',
                    name: 'lastName_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Number',
                    name: 'number_input',
                    type: 'number'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a Player Position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        {key: 'Keeper', value: 'Keeper'},
                        {key: 'Defense', value: 'Defense'},
                        {key: 'Midfield', value: 'Midfield'},
                        {key: 'Striker', value: 'Striker'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }
        }
    };

    render() {
        return (
            <div>
                <AdminLayout>
                    <div className='edit_players_dialog_wrapper'>
                        <h2>
                            {this.state.formType}
                        </h2>

                        <div>
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <FormField
                                    id={'name'}
                                    formData={this.state.formData.name}
                                    change={(element) => this.updateForm(element)}
                                />
                            </form>
                        </div>
                    </div>
                </AdminLayout>
            </div>
        );
    }
}

export default EditPlayers;
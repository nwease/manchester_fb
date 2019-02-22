import React, {Component} from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from "../../ui/FormField";
import { validate } from "../../ui/miscellaneous";

class EditMatch extends Component {

    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event Date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Choose a local team',
                    name: 'choose_team',
                    type: 'select',
                    options: [{ key: 'Yes', value: 'Yes', }, { key: 'No', value: 'No' }]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Local',
                    name: 'result_local',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Choose a local team',
                    name: 'choose_team',
                    type: 'select',
                    options: [{ key: 'Yes', value: 'Yes', }, { key: 'No', value: 'No' }]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Away',
                    name: 'result_away',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
        }
    };

    render() {
        return (
            <AdminLayout>
                <div className='edit_match_dialog_wrapper'>
                    <h2>
                        {this.state.formType}
                    </h2>

                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'date'}
                                formData={this.state.formData.date}
                                change={(element) => this.updateForm(element)}
                            />

                            <div className='select_team_layout'>
                                <div className='label_inputs'>
                                    Local
                                </div>

                                <div className='wrapper'>
                                    <div className='left'>
                                        <FormField
                                            id={'local'}
                                            formData={this.state.formData.local}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>

                                    <div>
                                        <FormField
                                            id={'resultLocal'}
                                            formData={this.state.formData.resultLocal}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='select_team_layout'>
                                <div className='label_inputs'>
                                    Away
                                </div>

                                <div className='wrapper'>
                                    <div className='left'>
                                        <FormField
                                            id={'away'}
                                            formData={this.state.formData.away}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>

                                    <div>
                                        <FormField
                                            id={'resultAway'}
                                            formData={this.state.formData.resultAway}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default EditMatch;
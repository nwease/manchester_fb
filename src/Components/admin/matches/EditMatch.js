import React, {Component} from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from "../../ui/FormField";
import { validate } from "../../ui/miscellaneous";
import {firebaseTeams, firebaseDB, firebaseMatches} from "../../../firebase";
import { firebaseLoop } from "../../ui/miscellaneous";

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
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team Result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        {keys: 'Win', value: 'Win'},
                        {keys: 'Lose', value: 'Lose'},
                        {keys: 'Draw', value: 'Draw'},
                        {keys: 'N/A', value: 'N/A'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game Played',
                    name: 'select_played',
                    type: 'select',
                    options: [
                        {keys: 'Yes', value: 'Yes'},
                        {keys: 'No', value: 'No'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
        },
    };

    updateForm(element) {
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};

        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[0];

        newFormData[element.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    updateFields(match, teamOptions, teams, type, matchId) {
        const newFormData = {
            ...this.state.formData
        };

        for (let key in newFormData){
            if (match){
                newFormData[key].value = match[key];
                newFormData[key].valid = true;
            }
            if (key === 'local' || key === 'away'){
                newFormData[key].config.options = teamOptions
            }
        }
        this.setState({
            matchId,
            formType: type,
            formData: newFormData,
            teams
        })
    }

    componentDidMount(){
        const matchId = this.props.match.params.id;
        const getTeams = (match, type) => {
            firebaseTeams.once('value').then(snapshot=>{
                const teams = firebaseLoop(snapshot);
                const teamOptions = [];

                snapshot.forEach((childSnapshot)=>{
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    })
                });
                this.updateFields(match, teamOptions, teams, type, matchId)
            })
        };

        if(!matchId){
            getTeams(false, 'Add Match')
        } else {
            firebaseDB.ref(`matches/${matchId}`).once('value')
                .then((snapshot) => {
                    const match = snapshot.val();
                    getTeams(match, 'Edit Match')
                })
        }
    }

    successForm(message){
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000)
    }

    submitForm(event) {
        event.preventDefault();

        let submittedData = {};
        let validForm = true;

        for(let key in this.state.formData){
            submittedData[key] = this.state.formData[key].value;
            validForm = this.state.formData[key].valid && validForm;
        }

        this.state.teams.forEach((team) => {
            if (team.shortName === submittedData.local){
                submittedData['localThmb'] = team.thmb
            }
            if (team.shortName === submittedData.away){
                submittedData['awayThmb'] = team.thmb
            }
        });

        if(validForm){
            if (this.state.formType === 'Edit Match'){
                firebaseDB.ref(`matches/${this.state.matchId}`)
                    .update(submittedData).then(() => {
                        this.successForm('Correctly Updated');
                }).catch((e) => {
                    this.setState({ formError: true })
                })
            } else {
                firebaseMatches.push(submittedData).then(() => {
                    this.props.history.push('/admin_matches')
                }).catch((e) => {
                    this.setState({ formError: true })
                })
            }
        } else {
            this.setState({
                formError: true
            })
        }
    }

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

                            <div className='split_fields'>
                                <FormField
                                    id={'referee'}
                                    formData={this.state.formData.referee}
                                    change={(element) => this.updateForm(element)}
                                />

                                <FormField
                                    id={'stadium'}
                                    formData={this.state.formData.stadium}
                                    change={(element) => this.updateForm(element)}
                                />
                            </div>

                            <div className='split_fields last'>
                                <FormField
                                    id={'result'}
                                    formData={this.state.formData.result}
                                    change={(element) => this.updateForm(element)}
                                />

                                <FormField
                                    id={'final'}
                                    formData={this.state.formData.final}
                                    change={(element) => this.updateForm(element)}
                                />
                            </div>

                            <div className='success_label'>{this.state.formSuccess}</div>
                            {this.state.formError ? <div className='error_label'>ERROR</div> : ''}
                            <div className='admin_submit'>
                                <button onClick={(event) => this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default EditMatch;
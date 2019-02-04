import React, {Component} from 'react';
import Fade from 'react-reveal/Fade';
import FormField from "../../ui/FormField";
import {validate} from '../../ui/miscellaneous';

class Enroll extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            }
        }
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

    formSuccess(){
        const newFormData = {...this.state.formData};

        for(let key in newFormData){
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';
        }

        this.setState({
            formError: false,
            formData: newFormData,
            formSuccess: 'SUCCESS'
        })
    }

    submitForm(event) {
        event.preventDefault();

        let submittedData = {};
        let validForm = true;

        for(let key in this.state.formData){
            submittedData[key] = this.state.formData[key].value;
            validForm = this.state.formData[key].valid && validForm;
        }

        if(validForm){
            console.log(submittedData);
            this.formSuccess()
        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <Fade>
                <div className='enroll_wrapper'>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <div className='enroll_title'>
                            Enter your email
                        </div>

                        <div className="enroll_input">
                            <FormField
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(element) => this.updateForm(element)}
                            />

                            {this.state.formError ?
                                <div className='error_label'>Wrong input, please try again.</div>
                                :null
                            }

                            <div className="success_label">
                                {this.state.formSuccess}
                            </div>

                            <button onClick={(event) => this.submitForm(event)}>Click Here</button>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;
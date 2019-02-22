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
        teams: []
    };

    render() {
        return (
            <AdminLayout>
                EDIT
            </AdminLayout>
        );
    }
}

export default EditMatch;
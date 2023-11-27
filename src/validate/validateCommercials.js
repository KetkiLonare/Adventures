export const validateCommercials = values =>{
    let errors = {};

    if (!values?.first_name) {
        errors.first_name = "Name is required";
    }
    if (!values?.last_name) {
        errors.last_name = "Last Name is required";
    }

    if (!values?.contact_no) {
        errors.contact_no = "Mobile Number is required";
    }

    if (!values?.email) {
        errors.email = "Email is required";
    }

    // project location

    if (!values?.prjct_loc_street) {
        errors.prjct_loc_street = "Email is required";
    }
    if (!values?.prjct_loc_city) {
        errors.prjct_loc_city = "Email is required";
    }
    if (!values?.prjct_loc_state) {
        errors.prjct_loc_state = "Email is required";
    }
    if (!values?.prjct_loc_country) {
        errors.prjct_loc_country = "Email is required";
    }
    if (!values?.prjct_loc_zip) {
        errors.prjct_loc_zip = "Email is required";
    }

    // Company/Organization  validation

     if (!values?.company_org_name) {
        errors.company_org_name = "Email is required";
    }


    // Company Address validation

    if (!values?.company_street) {
        errors.company_street = "Email is required";
    } 
    if (!values?.company_city) {
        errors.company_city = "Email is required";
    }
     if (!values?.company_state) {
        errors.company_state = "Email is required";
    }
     if (!values?.company_zip) {
        errors.company_zip = "Email is required";
    } 
 
    if (!values?.digit_stuct_designation) {
        errors.digit_stuct_designation = "Email is required";
    } 
// Project Type Validation
    if (!values?.project_type) {
        errors.project_type = "Email is required";
    } 
 
    // Budget validation

    if (!values?.budget) {
        errors.budget = "Budget is required";
    } 

    if (!values?.project_approval) {
        errors.project_approval = "Budget is required";
    } 

    if (!values?.construction_type) {
        errors.construction_type = "Budget is required";
    } 

    return errors;

}


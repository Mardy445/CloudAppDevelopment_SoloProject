class ErrorMessageFunctionality{
    constructor(id){
        this.id = id;
        document.body.addEventListener('mouseup', () => this.clearMessageDiv(), true);
    }

    clearMessageDiv(){
        document.getElementById(this.id).innerHTML = "";
    }

    //Displays an error message on the check in section screen with the given message
    alertError(msg) {
        document.getElementById(this.id).innerHTML = '<div class="alert alert-danger alert-dismissible padding" role="alert">' +
            msg +
            '</div>';
    }

    //Displays a success message on the check in section screen with the given message
    alertSuccess(msg) {
        document.getElementById(this.id).innerHTML = '<div class="alert alert-success alert-dismissible padding" role="alert">' +
            msg +
            '</div>';
    }
}
var API;
if (process.env.NODE_ENV === 'production') {
  API = {
    HOST: 'https://radiant-tor-53924.herokuapp.com'
  };
  API.URL = API.HOST;
} else {
  API = {
    HOST: 'http://localhost:',
    PORT: '8088'
  };
  API.URL = API.HOST + API.PORT;
}

module.exports = {
  API,
  TIME_TOKEN: '1d',
  messages: {
    congratulation: 'Congratulation, you are logged!',
    password_is_not_valid: 'Inputted password is not valid',
    account_is_not_activated: 'Your account isn\'t activated',
    you_must_sign_up: 'Before login you must sign up!',
    link_is_not_valid: 'link is not valid',
    userNotFound: 'userNotFound',
    linkAlreadyActivated: 'linkAlreadyActivated',
    send_offer: 'You have successfully send offer!',
    send_contact: 'You have successfully send contact!',
    profile_was_successfully_updated: 'profile was successfully updated',
    proposal_created_already: 'Proposal have been created already!',
    proposal_added: 'Proposal have been added!',
    not_permission_to_delete: 'Sorry, you haven\'t permission to delete this proposal!',
    deleted_proposal: 'Congratulation, you deleted proposal',
    profileError: 'profileError',
    check_your_email: 'Congratulation, check your email for activation'
  }
};

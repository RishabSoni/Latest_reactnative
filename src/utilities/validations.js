export const errors = {
  fname: 'First name required. * ',
  lname: 'last name required. * ',
  email: 'Email required. * ',
  password: 'Password required. * ',
  role: 'Select any one role * ',
  mlsIds: 'MLS ID required. * ',
  agentDetails: 'Agent details required. * (Licence / State)',
  companyEin: 'Company EIN required.',
  companyName: 'Company name required. *',
  website: 'Website is required. *',
  googleReview: 'Google Review is required. *',
  isRemember: 'please check term and conditions. *',
};

export const AgentForm = form => {
  if (!form.fname) {
    return errors.fname;
  } else if (!form.lname) {
    return errors.lname;
  } else if (!form.email) {
    return errors.email;
  } else if (!form.password) {
    return errors.password;
  } else if (!form.role.selected) {
    return errors.role;
  } else if (
    (form.role.selected.value || form.role.selected) == 'Agent' &&
    form.mlsIds.findIndex(d => d.id == '') > -1
  ) {
    return errors.mlsIds;
  } else if (
    (form.role?.selected?.value || form.role?.selected) == 'Agent' &&
    form.agentDetails.findIndex(
      d => d.state == null || d.state == 'Select any one' || d.lic == '',
    ) > -1
  ) {
    return errors.agentDetails;
  } else if (
    (form.role?.selected?.value || form.role?.selected) == 'Vendor' &&
    !form.companyName
  ) {
    return errors.companyName;
  } else if (
    (form.role?.selected?.value || form.role?.selected) == 'Vendor' &&
    !form.companyEin
  ) {
    return errors.companyEin;
  } else if (
    (form.role?.selected?.value || form.role?.selected) == 'Vendor' &&
    !form.website
  ) {
    return errors.website;
  } else if (
    (form.role?.selected?.value || form.role?.selected) == 'Vendor' &&
    !form.googleReview
  ) {
    return errors.googleReview;
  } else {
    return undefined;
  }
};

export const loginForm = form => {
  if (!form.email) {
    return errors.email;
  } else if (!form.password) {
    return errors.password;
  } else if (!form.isRemember) {
    return errors.isRemember;
  } else {
    return undefined;
  }
};

const formatEmail = (email) => {
    return email.replaceAll('@', '').replaceAll('.', '')
}




export default formatEmail;
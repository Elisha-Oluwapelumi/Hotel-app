let usersignupdetails = []
if (localStorage.userssignedup) {
    let getback = JSON.parse(localStorage.userssignedup)
    usersignupdetails = getback
}

const Signup = () => {
    let input1 = document.getElementById("firstname").value
    let input2 = document.getElementById("lastname").value
    let input3 = document.getElementById("email").value
    let input4 = document.getElementById("username").value
    let input5 = document.getElementById("password").value
    let input6 = document.getElementById("repeatpassword").value
    let input7 = document.getElementById("phone").value
    let input8 = document.getElementById("checked").checked
    let emailExists = usersignupdetails.some(user => user.input3 === input3);
    let usernameExists = usersignupdetails.some(user => user.input4 === input4);

    if (input1 == "" || input2 == "" || input3 == "" || input4 == "" || input7 == "") {
        alert("Please Fill in all Spaces");
    } else if (input5 !== input6) {
        alert("Password Mismatch");
    } else if (input8) {
        alert("Please mark the Remember me");
    } else if (emailExists) {
        alert("This email is already registered");
    } else if (usernameExists) {
        alert("This username is already taken");
    } else {
        alert("Account Created Successfully");
        let usersignedup = {
            input1,
            input2,
            input3,
            input4,
            input5,
            input7
        }
        usersignupdetails.push(usersignedup);
        console.log(usersignupdetails);
        localStorage.setItem("userssignedup", JSON.stringify(usersignupdetails));
        window.location.href = "login.html";
    }
}

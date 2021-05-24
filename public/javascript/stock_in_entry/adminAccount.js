$(".AA-updateAccount").submit((event) => {
    event.preventDefault();
    let username = $(".AA-username").val();
    let password = $(".AA-password").val();
    let confirmpass = $(".AA-confirmpassword").val();

    const saveAdmin = () => {
        firestore.collection("Account").doc("sva1ootNyElZeI6XTHcS").update({
            username : username,
            password : CryptoJS.SHA3(password).toString(),
        });
        swal("Admin Account","Admin Account Successfully Updated","success");
        $(".AA-password").val("");
        $(".AA-confirmpassword").val("");
    }
    password == confirmpass ? saveAdmin() : swal("","Password and Confirm Password did not Match","error");
});

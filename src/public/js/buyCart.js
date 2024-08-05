function buyCart(cart) {
    console.log(cart);
    fetch(`/api/carts/${cart}/purchase`, {
        method: 'GET',
    }).then(async (data) => {
        if (data.status >= 400 && data.status < 500) {
            Swal.fire({
                title: "Error",
                text: (await data.json()).error,
                allowOutsideClick: false
            })
        } else {
            Swal.fire({
                title: "Success!",
                text: "Successfully purchased all available products! A ticket has been sent to your email.",
                allowOutsideClick: false
            })
        }
    });
}
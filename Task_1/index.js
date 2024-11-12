document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const name = event.target.name?.value;
    const email = event.target.email?.value;
    const message = event.target.message?.value;
    const send = event.target.querySelector("button[type='submit']");
    console.log(name + " " + email);

    if (!name || !email || !message) {
        console.error("Form fields are missing");
        showToast("Please fill in all the fields.", true); 
        return;
    }
    if (!name || name.length < 3) {
        showToast("Please enter a valid name (at least 3 characters).", true);
        return;
    }

    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email) || !email.includes("gmail.com")) {
        showToast("Please enter a valid email address.", true); 
        return;
    }

    
    if (!message) {
        showToast("Please enter a message.", true); 
        return;
    }

    send.innerHTML = '<i class="bi bi-send-check"></i> Sending...';

    const formData = { name, email, message };
    try {
        const response = await fetch("http://localhost:5500/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.text();
        console.log(result);
        document.getElementById("resmessage").innerText = result;
        showToast(result, false); 

        setTimeout(() => {
            send.innerHTML = '<i class="bi bi-send-check-fill"></i> Sent';
        }, 1000);
        setTimeout(()=>{
            event.target.name.value = "";  
            event.target.email.value = ""; 
            event.target.message.value = "";
            send.innerHTML='<i class="bi bi-send"></i> Send';
        },1000);
    }
    catch (err) {
        console.log("Error in form Submission", err);
        document.getElementById("resmessage").innerText = "Failed to submit the form, please try again!";
        showToast("Failed to submit the form, please try again!", true); 
        send.innerHTML = '<i class="bi bi-send-slash"></i> Send';
    }
});


function showToast(message, isError) {
    const toast = document.getElementById("resmessage");
    toast.innerText = message;

    
    toast.classList.toggle("error", isError);

    
    toast.style.display = "block";
    toast.style.opacity = "1";

   
    setTimeout(() => {
        toast.style.opacity = "0"; 
        setTimeout(() => {
            toast.style.display = "none"; 
        }, 500); 
    }, 3000); 
}

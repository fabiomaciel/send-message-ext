document.addEventListener('DOMContentLoaded',()=>{
    const button = document.getElementById("button"),
          text = document.getElementById("insert"),
          textArea = document.getElementById("textarea");
    
    button.addEventListener("click",()=>{
        let form = {"command": text.value}
        let resp = null;
        let opts = {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {}
        };
        fetch('http://10.7.30.109:4545', opts)
            .then((response) => {
                return response.json();
            })
            .then((body)=>{
                textArea.value = body;
            })
            .catch((e)=>{
                console.log(e);
            });
    })
});

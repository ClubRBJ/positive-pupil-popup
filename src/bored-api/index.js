async function fetchData() {
    const res=await fetch ("https://www.boredapi.com/api/activity?accessibility=0&price=0&participants=1");
    const str = await res.text();
    let js = JSON.parse(str);
    document.getElementById("activity").innerHTML=js.activity;
    //document.getElementById("accessibility").innerHTML=js.accessibility;
    //document.getElementById("price").innerHTML=js.price;
    //document.getElementById("participants").innerHTML=js.participants;
    document.getElementById("link").innerHTML=js.link;
}
fetchData();

document.getElementById('bored').addEventListener("click", function() { 
    fetchData();
});
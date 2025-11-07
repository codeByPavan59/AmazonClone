export async function greetings() {
  const response = await fetch('https://supersimplebackend.dev/greeting',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: 'Pavan'
    })
  });
  // throw(response);

  if(response.status >= 400){
    console.log('It is an error');
    
  }
  const asdfg = await response.text();
  console.log(asdfg);
  /*
  try {
    const response2 = await fetch('https://amazon.com');
    const amazon = response2.json();
    console.log(amazon);
    
  } catch (error) {
    console.log('CORS error ');
    
  }
  */
  /*
  const response = await fetch('https://supersimplebackend.dev/greeting');

  const text = response.text();
  console.log(text);*/
  
  // const xhr = new XMLHttpRequest();

  // xhr.addEventListener('load',() => {
  //   console.log(xhr.response);
    
  // })

  // xhr.open('GET','https:supersimplebackend.dev/greeting');
  // xhr.send();
}
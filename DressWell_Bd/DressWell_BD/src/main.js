import { createClient } from "@supabase/supabase-js";

// Acceso al botón HTML
const button = document.querySelector(".btn");
// Acceso al cuerpo de mi tabla
const tbody = document.querySelector(".tbody");
const thead = document.querySelector(".thead");

const form = document.querySelector(".form");

// Llaves de acceso a Supabase
const supabaseUrl = "https://gjfbzaqofefxwsglwnal.supabase.co";
const supabaseKey = "sb_publishable_3lp4BI3DuK06oGQknpNd3Q_ouQmo_vF";

// Instancia de supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para mostrar los datos en una tabla
async function showDataTable() {
  const { data, error } = await supabase.from("DressWell").select("Name, Prize ,Amount,Despcripcion,Time");

  if (error) {
    console.warn("Hay un error de conexión!");
    return;
  }

  tbody.innerHTML = "";
  thead.innerHTML = `
  <tr>
    <th>Name</th>
    <th>Prize</th>
    <th>Amount</th>
    <th>Descripcion</th>
    <th>Time</th>
    
  </tr>
  `;
  data.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td> ${p.name} </td>
        <td> ${p.prize} </td>
        <td> ${p.amount} </td>
        <td> ${p.Descripcion ?? "—"} </td>
        <td> ${p.time} </td>
        
        
      </tr>
    `;
  });
}
async function insertData(e) {
  e.preventDefault();

  const name = form.name;
  const prize = form.prize;
  const amount = form.amount;
  const Descripcion = form.Descripcion;
  const time = form.time;
  

  const { error } = await supabase
    .from("DressWell")
    .insert({ name: name.value, prize: prize.value, amount: amount.value , Descripcion: Descripcion.value, 
    time: time.value});

  if (error) {
    console.log(error.message);
    return;
  }

  console.log("Producto insertado sastifactoriamente!");
}

button.addEventListener("click", showDataTable);
form.addEventListener("submit", insertData);
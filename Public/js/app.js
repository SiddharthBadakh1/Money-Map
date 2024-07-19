const foodPercentage = JSON.stringify(percentages.foodPercentage);
const travelPercentage = JSON.stringify(percentages.travelPercentage);
const rentPercentage = JSON.stringify(percentages.rentPercentage);

console.log('Food Percentage:', percentages.foodPercentage);
console.log('Travel Percentage:', percentages.travelPercentage);
console.log('Rent Percentage:', percentages.rentPercentage);



// Log the converted percentages to ensure they are numbers
console.log('Food Percentage (number):', foodPercentage);
console.log('Travel Percentage (number):', travelPercentage);
console.log('Rent Percentage (number):', rentPercentage);

// Values for the pie chart
const values = [foodPercentage, travelPercentage, rentPercentage];
const labels = ["Food", "Travel", "Rent"];

// Log the values to ensure they are correct
console.log('Values:', values);
console.log('Labels:', labels);

const ctx = document.getElementById("myPieChart").getContext("2d");
const myPieChart = new Chart(ctx, {
type: "pie",
data: {
labels: labels,
datasets: [
{
data: values,
backgroundColor: [
"rgba(255, 99, 132, 0.2)",
"rgba(54, 162, 235, 0.2)",
"rgba(255, 206, 86, 0.2)",
"rgba(75, 192, 192, 0.2)",
],
borderColor: [
"rgba(255, 99, 132, 1)",
"rgba(54, 162, 235, 1)",
"rgba(255, 206, 86, 1)",
"rgba(75, 192, 192, 1)",
],
borderWidth: 1,
},
],
},
options: {
responsive: true,
plugins: {
legend: {
position: "top",
},
tooltip: {
callbacks: {
label: function (tooltipItem) {
let total = 0;
tooltipItem.chart.data.datasets[0].data.forEach(function (value) {
total += value;
});
const currentValue = tooltipItem.raw;
const percentage = Math.floor((currentValue / total) * 100 + 0.5);
return `${currentValue} (${percentage}%)`;
},
},
},
},
},
});
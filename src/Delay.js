export default function (wait) {
  return new Promise( (success) => {
       setInterval(success, wait);
    }
  ) 
}
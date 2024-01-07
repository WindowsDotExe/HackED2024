import './homepage.css'

function Homepage() {
    return (
        <body>
         <link href='https://fonts.googleapis.com/css?family=Lexend Deca' rel='stylesheet'></link>

        <div className='logo-container'>
        <svg height="130" stroke="#2E475D" stroke-width="2" class="text-line" width="130%"><text x="50%" dominant-baseline="middle" text-anchor="middle" y="50%"> ByteSwipe! </text></svg>
        </div>

         <h2> This is dummy text. This is more dummy text. This is more dummy text. </h2>
        
        <div className='button-container'>
         <button > Register </button>
         <button > Login </button></div>
        
        </body>
    );
    }

export default Homepage;

const main = document.querySelector('main');
const root = document.querySelector(':root');
const input = document.getElementById('input');
const resultInput = document.getElementById('result');

const allowedKeys = [ "(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " " ];

/* Adding an event listener to each button with the class of charKey. When the button is clicked, it
will add the value of the button to the input. */
document.querySelectorAll( '.charKey' ).forEach( function( charKeyBtn )
{
   charKeyBtn.addEventListener('click', function()
   {
      const value = charKeyBtn.dataset.value;
      input.value += value;
   });
} );

/* Adding an event listener to the button with the id of clear. When the button is clicked, it will
clear the input and focus on it. */
document.getElementById( 'clear' ).addEventListener( 'click', function()
{
   input.value = '';
   input.focus();
});

/* An event listener that is listening for a keydown event. When a keydown event is triggered, it will
call the function that is passed to it. */
input.addEventListener( 'keydown', function( e )
{
   e.preventDefault();

  /* Checking if the key pressed is in the allowedKeys array. If it is, it will add the key to the
  input. */
   if ( allowedKeys.includes( e.key ) )
   {
      input.value += e.key;
      return;
   }

   /* Checking if the key pressed is the backspace key. If it is, it will remove the last character
   from the input. */
   if ( e.key === 'Backspace' )
   {
      input.value = input.value.slice( 0, -1 );
      return;
   }

   /* Checking if the key pressed is the enter key. If it is, it will call the calculate function. */
   if ( e.key === 'Enter' )
   {
      calculate();
      return;
   }
} );

/* Adding an event listener to the button with the id of equal. When the button is clicked, it will
call the calculate function. */
document.getElementById( 'equal' ).addEventListener( 'click', calculate );

/**
 * The function `calculate()` takes the value of the input field, evaluates it as a mathematical
 * expression, and then displays the result in the result input field.
 * 
 * The `eval()` function is a built-in JavaScript function that evaluates a string as a mathematical
 * expression. 
 * 
 * It is not recommended to use this function in production code
 */
function calculate()
{
   resultInput.value = 'Error';
   resultInput.classList.add( 'error', 'text-center' );
   
   /* Evaluating the value of the input field as a mathematical expression. */
   const result = eval( input.value );
   
   resultInput.value = result;
   resultInput.classList.remove( 'error', 'text-center' );
}

/* This is the code that is responsible for copying the result to the clipboard. It is adding an
event listener to the button with the id of copyToClipboard. When the button is clicked, it will
check
if the button's text is 'Copy'. If it is, it will change the button's text to 'Copied!', add the
success class to the button, and copy the result to the clipboard. After one second, it will call
the
clearBtnClicked function and pass the button to it. */
document.getElementById('copyToClipboard').addEventListener('click', function(e)
{
   const button = e.currentTarget;
   
   if ( button.innerText === 'Copy' )
   {
      button.classList.add( 'success', 'transition' );
      button.innerText = 'Copied!';
      navigator.clipboard.writeText( resultInput.value );
   }

   setTimeout( () => clearBtnClicked( button ), 3000 );
});

/**
 * If the button's text is 'Copied', then change it to 'Copy' and remove the 'success' class.
 * @param button - The button that was clicked.
 */
function clearBtnClicked( button )
{
   button.classList.remove( 'success', 'transition' );
   button.innerText = 'Copy';
};

/* This is the code that is responsible for switching the theme of the calculator. It is adding an
event listener to the button with the id of themeSwitcher. When the button is clicked, it will check
if the theme is dark. If it is, it will set the theme to light. If it is not, it will set the theme
to dark. */
document.getElementById( 'themeSwitcher' ).addEventListener( 'click', function() 
{
   if ( main.dataset.theme === 'dark' )
   {
      root.style.setProperty( '--bg-color', '#f1f5f9' );
      root.style.setProperty( '--font-color', '#212529' );
      root.style.setProperty( '--border-color', '#aaa' );
      root.style.setProperty( '--primary-color', '#26834a' );
      main.dataset.theme = 'light';
   }
   
   else 
   {
      root.style.setProperty( '--bg-color', '#212529' );
      root.style.setProperty( '--font-color', '#f1f5f9' );
      root.style.setProperty( '--border-color', '#666' );
      root.style.setProperty( '--primary-color', '#4dff91' );
      main.dataset.theme = 'dark';
   }
});
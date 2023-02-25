
 //funcion de llevar el cv hasta arriba con el boton de ir arriba 
$(document).ready(function(){

	$('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
// funcion de desaparecer el boton de ir arriba cuando esta arriba
	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ir-arriba').slideDown(300);
		} else {
			$('.ir-arriba').slideUp(300);
		}
	});

});

//validacion del formulario de contacto
const form = document.getElementById('user-form');
const submitButton = document.getElementById('submit-btn');

let timeout = null;

let errors = {
  nickName: true,
  email: true,
  message: true,
};

const mailformatRegex = /^[^@]+@\w+(\.\w+)+\w$/;

document.querySelectorAll('.form-box').forEach((box) => {
  const boxInput = box.querySelector('input');

  boxInput.addEventListener('keydown', (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log(`Input ${boxInput.name} value: `, boxInput.value);

      validation(box, boxInput);
    }, 300);
  });
});

validation = (box, boxInput) => {
  if (boxInput.value == '') {
    showError(true, box, boxInput);
  } else {
    showError(false, box, boxInput);
  }

  if (boxInput.name == 'email') {
    if (!boxInput.value.match(mailformatRegex)) {
      showError(true, box, boxInput);
    } else {
      showError(false, box, boxInput);
    }
  }

  if (boxInput.name == 'message') {
    if (boxInput.value.length <= 6) {
      showError(true, box, boxInput);
    } else {
      showError(false, box, boxInput);
    }
  }

  submitController();
};

showError = (check, box, boxInput) => {
  if (check) {
    box.classList.remove('form-success');
    box.classList.add('form-error');
    errors[boxInput.name] = true;
  } else {
    box.classList.remove('form-error');
    box.classList.add('form-success');
    errors[boxInput.name] = false;
  }
};

submitController = () => {
  console.log(errors);
  if (errors.nickName || errors.email || errors.message) {
    submitButton.toggleAttribute('disabled', true);
  } else {
    submitButton.toggleAttribute('disabled', false);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  console.log([...formData]);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
});
  

	
  
$(document).ready(function() {
    $('#jobForm').submit(function(event) {
        event.preventDefault();

        // Perform client-side validation here if needed

        // Prepare data to be sent
        let formData = $(this).serialize();

        // Make AJAX request to the server
        $.ajax({
            type: 'POST',
            url: 'add_job.php',
            data: formData,
            dataType: 'json',
            success: function(response) {
                // Handle server response here
                console.log(response);

                // Show success or error message to the user
                let messageContainer = $('#responseMessage');

                if (response.success) {
                    messageContainer.text(response.message).removeClass('error').addClass('success');
                } else {
                    messageContainer.text(response.message).removeClass('success').addClass('error');
                }
            },
            error: function(xhr, status, error) {
                // Handle AJAX errors here
                console.error(xhr.responseText);
            }
        });
    });
});

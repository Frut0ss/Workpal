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
                let addedParamsContainer = $('#addedParams');

                if (response.success) {
                    messageContainer.text(response.message).removeClass('error').addClass('success');
                    // Show added parameters
                    addedParamsContainer.text(JSON.stringify(response.addedParams, null, 2)).removeClass('error').addClass('success');
                } else {
                    messageContainer.text(response.message).removeClass('success').addClass('error');
                    addedParamsContainer.empty(); // Clear added parameters in case of error
                }
            },
            error: function(xhr, status, error) {
                // Handle AJAX errors here
                console.error(xhr.responseText);
            }
        });
    });
});

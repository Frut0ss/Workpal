$(document).ready(function() {
    $('#jobForm').submit(function(event) {
        event.preventDefault();

        // Perform client-side validation here

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
            },
            error: function(xhr, status, error) {
                // Handle AJAX errors here
                console.error(xhr.responseText);
            }
        });
    });
});

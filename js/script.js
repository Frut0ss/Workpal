$(document).ready(function() {
    $('#jobForm').submit(function(event) {
        event.preventDefault();

        // Comment the date validation if needed to deactivate it
        if (!validateDates()) {
            displayErrorMessage('Invalid date range: Schedule Start Date must be before Schedule End Date.');
            return;
        }

        let formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: 'add_job.php',
            data: formData,
            dataType: 'json',
            success: function(response) {
                // Handle successful response from the server
                console.log(response);

                let messageContainer = $('#responseMessage');
                let addedParamsContainer = $('#addedParams');

                if (response.success) {
                    messageContainer.text(response.message).removeClass('error').addClass('success').show();
                    addedParamsContainer.text(JSON.stringify(response.addedParams, null, 2)).removeClass('error').addClass('success').show();
                } else {
                    messageContainer.text(response.message).removeClass('success').addClass('error').show();
                    addedParamsContainer.empty().hide();// Clear parameters in case of error
                }
            },
            error: function(xhr, status, error) { 
                // Handle errors returned by the server
                console.error(xhr.responseText);

                let messageContainer = $('#responseMessage');
                messageContainer.text('Server Error: Unable to process the request').removeClass('success').addClass('error').show();
                $('#addedParams').empty().hide();
            }
        });
    });

    function validateDates() {
        // Get Schedule Start Date and End Date values
        let startDateValue = $('#scheduleStartDate').val();
        let endDateValue = $('#scheduleEndDate').val();

        // Check if both dates are not empty
        if (startDateValue && endDateValue) {
            // Convert dates to Date objects for comparison
            let startDate = new Date(startDateValue);
            let endDate = new Date(endDateValue);

            // Validate if Start Date is before End Date
            if (startDate > endDate) {
                return false; // Dates are not valid
            }
        }
        return true; // Dates are valid
    }

    function displayErrorMessage(message) {
        // Show error message for 5 seconds and then hide
        let errorElement = $('<div class="error-message">' + message + '</div>');
        $('#jobForm').append(errorElement); // Change prepend to append
        setTimeout(function() {
            errorElement.fadeOut('slow', function() {
                $(this).remove();
            });
        }, 5000);
    }    
});

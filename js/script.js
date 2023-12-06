$(document).ready(function() {
    $('#jobForm').submit(function(event) {
        event.preventDefault();

        // Perform client-side validation here
        if (!validateDates()) {
            // Dates are not valid, display an error message or handle it accordingly
            return;
        }

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

                    // Display errors if available
                    if (response.errors && response.errors.length > 0) {
                        let errorsList = '<ul>';
                        // Concatenate errors into a single message
                        let combinedError = "Invalid date range: Schedule Start Date must be before Schedule End Date.";
                        errorsList += '<li>' + combinedError + '</li>';
                        errorsList += '</ul>';
                        messageContainer.after(errorsList);
                    }
                }
            },
            error: function(xhr, status, error) {
                // Handle AJAX errors here
                console.error(xhr.responseText);
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
                // Display an error message or handle the validation failure
                alert('Schedule Start Date cannot be after Schedule End Date.');
                return false; // Dates are not valid
            }
        }
        return true; // Dates are valid
    }
});

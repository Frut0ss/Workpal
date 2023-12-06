<?php
// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetch and sanitize form data
    $jobTitle = filter_var($_POST['jobTitle'], FILTER_SANITIZE_STRING);
    $jobDescription = filter_var($_POST['jobDescription'], FILTER_SANITIZE_STRING);
    $jobEstHours = filter_var($_POST['jobEstHours'], FILTER_VALIDATE_INT);
    $entryDate = $_POST['entryDate'];
    $scheduleStartDate = $_POST['scheduleStartDate'];
    $scheduleEndDate = $_POST['scheduleEndDate'];

    // Validate form inputs
    $isValid = true;
    $errors = [];

    // Check if Schedule Start Date is populated and validate against Schedule End Date
    if (!empty($scheduleStartDate) && !empty($scheduleEndDate)) {
        $startTimestamp = strtotime($scheduleStartDate);
        $endTimestamp = strtotime($scheduleEndDate);

        if ($startTimestamp > $endTimestamp) {
            $isValid = false;
            $errors[] = "Schedule Start Date cannot be after Schedule End Date.";
        }
    }

    // Check if Schedule End Date is populated and validate against Schedule Start Date
    if (!empty($scheduleStartDate) && !empty($scheduleEndDate)) {
        $startTimestamp = strtotime($scheduleStartDate);
        $endTimestamp = strtotime($scheduleEndDate);

        if ($endTimestamp < $startTimestamp) {
            $isValid = false;
            $errors[] = "Schedule End Date cannot be before Schedule Start Date.";
        }
    }

    // Simulate adding job to system (Replace this with actual logic)
    $jobAddedSuccessfully = $isValid; // Consider the job added only if the validation passed

    // Prepare JSON response with success status and added parameters or errors
    if ($jobAddedSuccessfully) {
        $addedParams = [
            'jobTitle' => $jobTitle,
            'jobDescription' => $jobDescription,
            'jobEstHours' => $jobEstHours,
            'entryDate' => $entryDate,
            'scheduleStartDate' => $scheduleStartDate,
            'scheduleEndDate' => $scheduleEndDate
        ];

        $response = [
            'success' => true,
            'message' => 'Job added successfully',
            'addedParams' => $addedParams
        ];
    } else {
        $response = [
            'success' => false,
            'message' => 'Failed to add job',
            'errors' => $errors
        ];
    }

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>

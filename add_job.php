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
    // Perform any necessary validation here

    // Simulate adding job to system (Replace this with actual logic)
    $jobAddedSuccessfully = true;

    // Prepare JSON response
    $response = [
        'success' => $jobAddedSuccessfully,
        'message' => $jobAddedSuccessfully ? 'Job added successfully' : 'Failed to add job'
    ];

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>

# Workpal

# Alejandro Frutos' Demo

## Installation Instructions:

1. Clone the project to your computer.
2. In the XAMPP `httpd-vhosts` file, set up a virtual host:

    ```apache
    <VirtualHost *:80>
        DocumentRoot "D:/xampp/htdocs/workpal"
        ServerName workpal.local
    </VirtualHost>
    ```
    Replace the "DocumentRoot" path with the location where you have cloned the project.

3. In your computer's hosts file located at `C:\Windows\System32\Drivers\etc`, set up the URL to access the project:

    ```
    127.0.0.1       workpal.local
    ```

4. Start Apache in XAMPP.

5. Access the project using the URL `http://workpal.local`.

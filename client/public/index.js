
function getCurrentURL() {
    return window.location.href
}

const url = getCurrentURL()
if (url == 'https://localhost:3000/' || url.indexOf("login")>-1 || url.indexOf("signup")>-1 ||  url.indexOf("account")>-1 
    || url.indexOf("product")>-1 || url.indexOf("my-order")>-1 || url.indexOf("AddCustomerPayment")>-1 || url.indexOf("ebill")>-1) {
    document.writeln(`<link rel="shortcut icon" href="https://localhost:3000/assets/img/favicon.png" type="image/x-icon" />`)
    document.writeln(`<link rel="stylesheet" href="https://localhost:3000/assets/css/font-icons.css" />`)
    document.writeln(`<link rel="stylesheet" href="https://localhost:3000/assets/css/plugins.css" />`)
    document.writeln(`<link rel="stylesheet" href="https://localhost:3000/assets/css/style.css" />`)
    document.writeln(`<link rel="stylesheet" href="https://localhost:3000/assets/css/responsive.css" />`)
    document.write('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/js/plugins.js"></scr' + 'ipt>');
    document.write('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/js/main.js"></scr' + 'ipt>');
} else {
    //<!-- Google Fonts -->
    document.writeln(`<link href="https://fonts.gstatic.com" rel="preconnect">`)
    document.writeln(`<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">`)

    //<!-- Vendor CSS Files -->
    document.writeln(`<link href="https://localhost:3000/assets/dashboard/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />`)
    document.writeln(`<link href="https://localhost:3000/assets/dashboard/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />`)
    document.writeln(`<link href="https://localhost:3000/assets/dashboard/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />`)
    document.writeln(`<link href="https://localhost:3000/assets/dashboard/vendor/quill/quill.snow.css" rel="stylesheet" />`)
    document.writeln(`<link href="https://localhost:3000/assets/dashboard/vendor/quill/quill.bubble.css" rel="stylesheet" />`)
    document.writeln(`<link href="https://localhost:3000/assets/dashboard/vendor/remixicon/remixicon.css" rel="stylesheet" />`)
    document.writeln(`<link href="https://localhost:3000/assets/dashboard/vendor/simple-datatables/style.css" rel="stylesheet" />`)

    //<!-- Template Main CSS File -->
    document.writeln(`<link href="https://localhost:3000/assets/dashboard/css/style.css" rel="stylesheet" />`)

    // <!-- Vendor JS Files -->
    document.writeln('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/dashboard/vendor/apexcharts/apexcharts.min.js"></scr' + 'ipt>');
    document.writeln('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/dashboard/vendor/bootstrap/js/bootstrap.bundle.min.js"></scr' + 'ipt>');
    document.writeln('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/dashboard/vendor/chart.js/chart.min.js"></scr' + 'ipt>');
    document.writeln('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/dashboard/vendor/echarts/echarts.min.js"></scr' + 'ipt>');
    document.writeln('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/dashboard/vendor/quill/quill.min.js"></scr' + 'ipt>');
    document.writeln('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/dashboard/vendor/simple-datatables/simple-datatables.js"></scr' + 'ipt>');
    document.writeln('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/dashboard/vendor/tinymce/tinymce.min.js"></scr' + 'ipt>');
    document.writeln('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/dashboard/vendor/php-email-form/validate.js"></scr' + 'ipt>');

    // <!-- Template Main JS File -->
    document.writeln('<scr' + 'ipt type="text/javascript" src="https://localhost:3000/assets/dashboard/js/main.js"></scr' + 'ipt>');
}
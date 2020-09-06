export const TEMPLATE = `<style>
    table {
        border-collapse: collapse;
        border: 1px solid black;
        padding: 10px
    }

    td {
        padding: 10px
    }
</style>
<table border="2">
    <tr>
        <td>Message:</td>
        <td>{{ exception.message }}</td>
    </tr>
    <tr>
        <td>REQUEST URL:</td>
        <td>{{ request.url }}</td>
    </tr>
    <tr>
        <td>REQUEST PAYLOAD:</td>
        <td>{{ request.payload }}</td>
    </tr>
    <tr>
        <td>REQUEST HEADERS:</td>
        <td>{{ request.headers }}</td>
    </tr>
    <tr>
        <td>STACK:</td>
        <td style="white-space: pre;">{{ exception.stack }}</td>
    </tr>
    <tr>
        <td>REQUEST TIMESTAMP</td>
        <td>{{ request.timestamp }}</td>
    </tr>
</table>`;

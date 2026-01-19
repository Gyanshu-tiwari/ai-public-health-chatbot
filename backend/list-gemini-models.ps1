# List available Gemini models
Write-Host "Listing available Gemini models..."

# Force TLS 1.2 (Windows fix)
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$apiKey = "AIzaSyAQiDDiLaW4TdFWduslXV0amI6KUkug6RE"
$url = "https://generativelanguage.googleapis.com/v1beta/models?key=$apiKey"

try {
    $response = Invoke-RestMethod `
        -Method GET `
        -Uri $url `
        -Headers @{ "Content-Type" = "application/json" }

    Write-Host "`n✅ SUCCESS - Available Models:`n"
    $response.models | ForEach-Object {
        Write-Host "Name: $($_.name)"
        Write-Host "Display Name: $($_.displayName)"
        Write-Host "Description: $($_.description)"
        Write-Host "Supported Methods: $($_.supportedGenerationMethods -join ', ')"
        Write-Host "---"
    }
}
catch {
    Write-Host "`n❌ ERROR OCCURRED"
    Write-Host "Status Code:" $_.Exception.Response.StatusCode.value__

    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host "Response:" $reader.ReadToEnd()
}

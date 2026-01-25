Write-Host "Testing Gemini API with gemini-flash-latest..."

# Force TLS 1.2 (Windows fix)
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$apiKey = "AIzaSyCjqBUK8T8ycYT6g-WgsWcpGUA43x9tJ6g"

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=$apiKey"

$body = @{
    contents = @(
        @{
            parts = @(
                @{
                    text = "Hello, how are you?"
                }
            )
        }
    )
} | ConvertTo-Json -Depth 5

try {
    $response = Invoke-RestMethod `
        -Method POST `
        -Uri $url `
        -Headers @{ "Content-Type" = "application/json" } `
        -Body $body

    Write-Host "`n✅ SUCCESS RESPONSE:`n"
    Write-Host $response.candidates[0].content.parts[0].text
}
catch {
    Write-Host "`n❌ ERROR OCCURRED"
    Write-Host "Status Code:" $_.Exception.Response.StatusCode.value__

    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host "Response:" $reader.ReadToEnd()
}

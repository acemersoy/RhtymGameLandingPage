$connections = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($connections) {
    $procIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($p in $procIds) {
        $proc = Get-Process -Id $p -ErrorAction SilentlyContinue
        Write-Host "Killing PID $p ($($proc.ProcessName))..."
        Stop-Process -Id $p -Force
    }
    Write-Host "Port 3000 serbest."
} else {
    Write-Host "Port 3000 zaten bos."
}

@echo off
:: ================================
:: Auto-elevacion a Administrador
:: ================================
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

setlocal EnableDelayedExpansion

echo =====================================
echo  Instalador de Stacks Docker
echo =====================================
echo.

REM ==================================================
REM COMPROBAR DOCKER
REM ==================================================
where docker >nul 2>nul
if errorlevel 1 (
    echo Docker no detectado.
    echo Instalando WSL2 y Docker Desktop...
    echo.

    REM ---- Registrar continuacion tras reinicio ----
    REG ADD "HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnce" ^
        /v ContinuarInstaladorDocker ^
        /t REG_SZ ^
        /d "\"%~dp0%~nx0\"" ^
        /f

    REM ---- Habilitar WSL2 ----
    echo Habilitando WSL2...
    dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

    REM ---- Establecer WSL2 como default ----
    wsl --set-default-version 2

    REM ---- Instalar Docker Desktop ----
    echo Instalando Docker Desktop...
    winget install --id Docker.DockerDesktop -e --accept-source-agreements --accept-package-agreements --silent

    echo.
    echo Reiniciando el equipo para completar la instalacion...
    timeout /t 10
    shutdown /r /t 0
    exit /b
)

echo Docker detectado correctamente.
echo.

REM ==================================================
REM ASEGURAR QUE DOCKER DESKTOP ESTE ARRANCADO
REM ==================================================
echo Comprobando Docker Desktop...

docker info >nul 2>nul
if errorlevel 1 (
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo Esperando a Docker...
    :wait_docker
    timeout /t 5 >nul
    docker info >nul 2>nul || goto wait_docker
)

echo Docker listo.
echo.

REM ==================================================
REM AQUI YA PUEDES SEGUIR CON TU SCRIPT
REM (credenciales, updateYml, compose up, etc.)
REM ==================================================

REM ==================================================
REM PEDIR CREDENCIALES
REM ==================================================
set /p ADMIN_EMAIL=Introduce el email del admin: 
set /p ADMIN_USER=Introduce el usuario admin: 
set /p ADMIN_PASS=Introduce la contraseña admin: 

echo.
echo Configurando archivos docker-compose...
echo.

REM ======================
REM PLANKA
REM ======================
call :updateYml "Planka\docker-compose.yml" ^
  "DEFAULT_ADMIN_EMAIL=.*" "DEFAULT_ADMIN_EMAIL=%ADMIN_EMAIL%" ^
  "DEFAULT_ADMIN_USERNAME=.*" "DEFAULT_ADMIN_USERNAME=%ADMIN_USER%" ^
  "DEFAULT_ADMIN_PASSWORD=.*" "DEFAULT_ADMIN_PASSWORD=%ADMIN_PASS%" ^
  "SECRET_KEY=.*" "SECRET_KEY=%ADMIN_PASS%"

REM ======================
REM NEXTCLOUD
REM ======================
call :updateYml "Nextcloud\docker-compose.yml" ^
  "NEXTCLOUD_ADMIN_USER:.*" "NEXTCLOUD_ADMIN_USER: %ADMIN_USER%" ^
  "NEXTCLOUD_ADMIN_PASSWORD:.*" "NEXTCLOUD_ADMIN_PASSWORD: %ADMIN_PASS%"

REM ======================
REM SUITECRM
REM ======================
call :updateYml "SuiteCRM\docker-compose.yml" ^
  "SUITECRM_USERNAME:.*" "SUITECRM_USERNAME: %ADMIN_USER%" ^
  "SUITECRM_PASSWORD:.*" "SUITECRM_PASSWORD: %ADMIN_PASS%"

echo.
echo Archivos actualizados.
echo.

REM ==================================================
REM ASEGURAR QUE DOCKER DESKTOP ESTE ARRANCADO
REM ==================================================
echo Comprobando estado de Docker Desktop...

docker info >nul 2>nul
if errorlevel 1 (
    echo Docker Desktop no esta en ejecucion. Iniciando...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

    echo Esperando a que Docker este listo...
    :wait_docker
    timeout /t 5 >nul
    docker info >nul 2>nul
    if errorlevel 1 goto wait_docker
)

echo Docker Desktop listo.
echo.
REM ==================================================
REM LEVANTAR STACKS
REM ==================================================
for %%D in (
    "Homebox"
    "Mattermost"
    "Nextcloud"
    "Planka"
    "SuiteCRM"
    "Wiki.js"
) do (
    echo =====================================
    echo Revisando %%~D...

    if exist "%~dp0%%~D\" (
        if exist "%~dp0%%~D\docker-compose.yml" (
            echo Carpeta encontrada. Levantando %%~D...
            cd /d "%~dp0%%~D"
            docker compose up -d
            cd /d "%~dp0"
        ) else (
            echo La carpeta %%~D existe, pero no se encontro docker-compose.yml. Saltando...
        )
    ) else (
        echo La carpeta %%~D no existe. Saltando...
    )
)
REM ==================================================
REM FUNCION PARA MODIFICAR YML
REM ==================================================
:updateYml
set FILE=%1
shift

if not exist "%FILE%" exit /b

copy "%FILE%" "%FILE%.bak" >nul

:loop
if "%~1"=="" exit /b

set FIND=%~1
set REPLACE=%~2

powershell -Command ^
 "(Get-Content '%FILE%') -replace '%FIND%', '%REPLACE%' | Set-Content '%FILE%'"

shift
shift
goto loop

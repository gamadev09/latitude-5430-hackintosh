# Dell Latitude 5430 — macOS Tahoe Hackintosh Guide

OpenCore EFI documentation and interactive macOS-style desktop guide for running **macOS Tahoe** on the **Dell Latitude 5430**, based on [Dortania's OpenCore Install Guide](https://dortania.github.io/OpenCore-Install-Guide/).

## System Specifications

| Component | Specification |
| :--- | :--- |
| **Target OS** | macOS Tahoe |
| **CPU** | Intel Core i7-1265U (12th Gen Alder Lake-U) |
| **Memory** | 16 GB DDR4 (Dual-Channel) |
| **Storage** | 512 GB NVMe SSD (APFS) |

## Compatibility

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **Core Hardware** | Working | Display, Audio, I2C Trackpad, Keyboard, USB, Battery |
| **Apple Ecosystem** | Working | iCloud, iMessage, FaceTime, Handoff & Continuity |
| **Fingerprint** | Working | Biometric unlock & authentication |
| **Virtualization** | Working | VT-x / Apple `Hypervisor.framework` (Docker, VMs) |
| **External Wake** | Working | Wakes reliably via external USB keyboard/mouse |
| **Internal Sleep / Wake** | External Only | Lid & internal keyboard/trackpad do not wake |
| **AirDrop** | Not Working | Not functional on this configuration |

## Dortania OpenCore Stack

- **BIOS Settings:**
  - `SATA / NVMe Mode`: `AHCI`
  - `Secure Boot` & `Fast Boot`: `Disabled`
  - `VT-d` & `CFG Lock`: Keep VT-x enabled for virtualization; enable `DisableIoMapper` & `AppleXcpmCfgLock` in `config.plist`
  - `SMBIOS`: Unique Serial, MLB, and SmUUID via `GenSMBIOS` with built-in `En0`
- **ACPI (SSDTs):** `SSDT-PLUG-ALT.aml`, `SSDT-EC-USBX.aml`, `SSDT-AWAC.aml`, `SSDT-PNLF.aml`, `SSDT-XOSI.aml`
- **Core Kexts:** `Lilu`, `VirtualSMC`, `WhateverGreen`, `AppleALC`, `VoodooI2C`, `USBToolBox` + `UTBMap`, `RestrictEvents`
- **Post-Install Power Management:**
  ```bash
  sudo pmset -a hibernatemode 0 standby 0 autopoweroff 0
  ```

## Local Preview

```powershell
pnpm start
```

Then open `http://localhost:3000`.

## GitHub Pages Deployment

This repository includes `.github/workflows/deploy.yml` for automatic deployment to GitHub Pages on pushes to `main`:

1. Place `wallpaper.jpg` in the repository root alongside `index.html`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.

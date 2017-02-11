import React, { Component } from 'react'

export interface LinuxProps {

}

export default class Linux extends Component<LinuxProps, undefined> {
  componentDidMount() {
    require('v86')
  }

  render () {
    return (
      <div>
        <div id="boot_options">
          <h4>Debugger</h4>
          <input type="button" value="Windows 98" id="start_windows98"/>
          <input type="button" value="Arch Linux" id="start_archlinux"/>
          <input type="button" value="Oberon" id="start_oberon"/>
          <input type="button" value="KolibriOS" id="start_kolibrios"/>
          <input type="button" value="Linux 2.6" id="start_linux26"/>
          <input type="button" value="Linux 3.18" id="start_linux3"/>
          <input type="button" value="Windows 1.01" id="start_windows1"/>
          <input type="button" value="FreeDOS" id="start_freedos"/>
          <input type="button" value="OpenBSD" id="start_openbsd"/>
          <input type="button" value="Solar OS" id="start_solos"/>
          <input type="button" value="Bootchess" id="start_bootchess"/>
          <input type="button" value="Test" id="start_test"/>
          <br/>
          <hr/>
          Restore state: <input type="file" id="restore_state"/>
          <br/>
          <hr/>
          <table>
            <tbody>
              <tr>
                  <td width={250}>CD image</td>
                  <td>
                      <select>
                          <option>None</option>
                          <option>Local file</option>
                          <option>External Server</option>
                      </select>
                      <input type="file" id="cd_image"/>
                  </td>
              </tr>

              <tr>
                  <td>Floppy disk image</td>
                  <td> <input type="file" id="floppy_image"/><br/></td>
              </tr>

              <tr>
                  <td>Hard drive disk image</td>
                  <td><input type="file" id="hd_image"/><br/></td>
              </tr>

              <tr>
                <td colSpan={2}><hr/></td>
              </tr>

              <tr>
                  <td>Memory size</td>
                  <td>
                      <input
                        id="memory_size"
                        type="number"
                        value={128} min={16} max={2048} step={16}/> MB<br/>
                  </td>
              </tr>

              <tr>
                <td>Video Memory size</td>
                <td>
                  <input
                    id="video_memory_size" type="number" value={8} min={1} max={128} step={1}/> MB<br/>
                </td>
              </tr>

              <tr>
                <td colSpan={2}><hr/></td>
              </tr>

              <tr>
                <td>Execution Cap </td>
                <td> <input type="number" value={100} min={5} max={100} step={5}/> %<br/> </td>
              </tr>

              <tr>
                <td>Boot order</td>
                <td>
                  <select id="boot_order">
                    <option value={213}>CD / Floppy / Hard Disk</option>
                    <option value={123}>CD / Hard Disk / Floppy</option>
                    <option value={231}>Floppy / CD / Hard Disk</option>
                    <option value={321}>Floppy / Hard Disk / CD</option>
                    <option value={312}>Hard Disk / Floppy / CD</option>
                    <option value={132}>Hard Disk / CD / Floppy</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <br/>
          <button id="start_emulation">Start Emulation</button>
          <br/>
          <div id="setup_error">Error: Video size must be at least over 9000</div>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
        <div id="runtime_options" >
          <input type="button" value="Step" id="step"/>
          <input type="button" value="Run until" id="run_until"/>
          <input type="button" value="Debugger" id="debugger"/>
          <input type="button" value="Dump Instructions" id="dump_instructions"/>
          <input type="button" value="Dump Instructions to file" id="dump_instructions_file"/>
          <input type="button" value="Dump Registers" id="dump_regs"/>
          <input type="button" value="Dump GDT/LDT" id="dump_gdt"/>
          <input type="button" value="Dump IDT" id="dump_idt"/>
          <input type="button" value="Dump page tables" id="dump_pt"/>
          <input type="button" value="Dump log" id="dump_log"/>
          <br/>
          <input type="button" value="Pause" id="run"/>
          <input type="button" value="Reset" id="reset"/>
          <input type="button" value="Exit" id="exit"/>
          <input type="button" value="Send Ctrl-Alt-Del" id="ctrlaltdel"/>
          <input type="button" value="Send Alt-Tab" id="alttab"/>
          <input type="button" value="Get floppy image" id="get_fda_image"/>
          <input type="button" value="Get second floppy image" id="get_fdb_image"/>
          <input type="button" value="Get hard disk image" id="get_hda_image"/>
          <input type="button" value="Get second hard disk image" id="get_hdb_image"/>
          <input type="button" value="Get cdrom image" id="get_cdrom_image"/>
          <input type="button" value="Save State" id="save_state"/>
          <input type="button" value="Load State" id="load_state"/>
          <input type="file" />
          <input type="button" value="Memory Dump (raw)" id="memory_dump"/>
          <input type="button" value="Disable mouse" id="toggle_mouse"/>
          <input type="button" value="Lock mouse" id="lock_mouse"/>
          <input type="button" value="Go fullscreen" id="fullscreen"/>
          <input type="button" value="Take screenshot (only graphic modes)" id="take_screenshot"/>
          <label>
              Scale:
              <input type="number" min="0.25" step="0.25" value="1.0" id="scale" />
          </label>
          <br/>
          <label id="change_fda" >
              Change floppy:
              <input type="file"/>
          </label>
          <label id="change_cdrom" >
              Change CD:
              <input type="file"/>
          </label>
        </div>

        <pre/>
        <pre/>
        <pre/>
        <br/>
        <div id="screen_container">
          <div id="screen"></div>
          <canvas id="vga"></canvas>
        </div>

        <input type="text" className="phone_keyboard" />

        <div id="runtime_infos" >
          Running: <span id="running_time">0s</span> <br/>
          Speed: <span id="speed">0</span>kIPS<br/>
          Avg speed: <span id="avg_speed">0</span>kIPS<br/>
          <br/>
          <div id="info_storage" >
            <b>IDE device (HDA or CDROM)</b><br/>
            Sectors read: <span id="info_storage_sectors_read">0</span><br/>
            Bytes read: <span id="info_storage_bytes_read">0</span><br/>
            Sectors written: <span id="info_storage_sectors_written">0</span><br/>
            Bytes written: <span id="info_storage_bytes_written">0</span><br/>
            Status: <span id="info_storage_status"></span><br/>
            <br/>
          </div>
          <div id="info_filesystem" >
            <b>9p Filesystem</b><br/>
            Bytes read: <span id="info_filesystem_bytes_read">0</span><br/>
            Bytes written: <span id="info_filesystem_bytes_written">0</span><br/>
            Last file: <span id="info_filesystem_last_file" ></span><br/>
            Status: <span id="info_filesystem_status"></span><br/>
            <br/>
          </div>
          <div id="info_network" >
            <b>Network</b><br/>
            Bytes received: <span id="info_network_bytes_received">0</span><br/>
            Bytes transmitted: <span id="info_network_bytes_transmitted">0</span><br/>
            <br/>
          </div>
          <b>VGA</b><br/>
          Mode: <span id="info_vga_mode"></span><br/>
          Resolution: <span id="info_res">-</span><br/>
          BPP: <span id="info_bpp">-</span><br/>
          <br/>
          Mouse: <span id="info_mouse_enabled">No</span><br/>
          Keyboard: <span id="info_keyboard_enabled">-</span><br/>
        </div>

        <div id="filesystem_panel" >
          <label>
              Send files to emulator<br/>
              <input type="file" id="filesystem_send_file" multiple/>
          </label>
          <br/>
          <br/>
          <label>
              Get file from emulator<br/>
              <input
                type="text"
                id="filesystem_get_file" placeholder="Absolute path"/>
          </label>
        </div>
        <br/>
        <textarea readOnly id="log"/>
        <textarea spellCheck={false} cols={40} rows={12} id="serial"/>
        <hr/>
      </div>
    )
  }
}

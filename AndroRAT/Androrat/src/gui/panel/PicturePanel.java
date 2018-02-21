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
package gui.panel;

import gui.UserGUI;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JPanel;
import javax.swing.JLabel;
import javax.swing.GroupLayout;
import javax.swing.GroupLayout.Alignment;
import javax.swing.LayoutStyle.ComponentPlacement;
import javax.swing.border.EtchedBorder;
import javax.swing.JButton;
import javax.swing.JComboBox;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.Date;
import javax.swing.JSplitPane;
import javax.swing.JList;
import javax.swing.border.TitledBorder;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class PicturePanel extends JPanel {
	
	private JLabel imgLabel;
	private JPanel panel;
	private JComboBox comboBox;
	
	private UserGUI gui;
	private JSplitPane splitPane;
	private JPanel panel_1;
	private JList list;
	private JPanel panel_2;
	
	private String lastTitle = "";
	private ArrayList<String> listAddr = new ArrayList<String>();

	/**
	 * Create the panel.
	 */
	public PicturePanel(UserGUI gui) {
		this.gui = gui;
		
		Object[] items = {"Back camera", "Front camera"};
		
		splitPane = new JSplitPane();
		splitPane.setResizeWeight(1.0);
		GroupLayout groupLayout = new GroupLayout(this);
		groupLayout.setHorizontalGroup(
			groupLayout.createParallelGroup(Alignment.TRAILING)
				.addGroup(groupLayout.createSequentialGroup()
					.addContainerGap()
					.addComponent(splitPane, GroupLayout.DEFAULT_SIZE, 501, Short.MAX_VALUE)
					.addContainerGap())
		);
		groupLayout.setVerticalGroup(
			groupLayout.createParallelGroup(Alignment.TRAILING)
				.addGroup(Alignment.LEADING, groupLayout.createSequentialGroup()
					.addContainerGap()
					.addComponent(splitPane, GroupLayout.DEFAULT_SIZE, 400, Short.MAX_VALUE)
					.addContainerGap())
		);
		
		panel = new JPanel();
		splitPane.setLeftComponent(panel);
		panel.setBorder(new EtchedBorder(EtchedBorder.LOWERED, null, null));
		
		imgLabel = new JLabel();
		panel.add(imgLabel);
		
		panel_1 = new JPanel();
		splitPane.setRightComponent(panel_1);
		
		list = new JList();
		list.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				fireMouseClickedInList();
			}
		});
		
		panel_2 = new JPanel();
		panel_2.setBorder(new TitledBorder(null, "Options", TitledBorder.LEADING, TitledBorder.TOP, null, null));
		GroupLayout gl_panel_1 = new GroupLayout(panel_1);
		gl_panel_1.setHorizontalGroup(
			gl_panel_1.createParallelGroup(Alignment.LEADING)
				.addGroup(Alignment.TRAILING, gl_panel_1.createSequentialGroup()
					.addContainerGap()
					.addGroup(gl_panel_1.createParallelGroup(Alignment.TRAILING)
						.addComponent(list, Alignment.LEADING, GroupLayout.DEFAULT_SIZE, 210, Short.MAX_VALUE)
						.addComponent(panel_2, Alignment.LEADING, GroupLayout.DEFAULT_SIZE, 210, Short.MAX_VALUE))
					.addContainerGap())
		);
		gl_panel_1.setVerticalGroup(
			gl_panel_1.createParallelGroup(Alignment.LEADING)
				.addGroup(Alignment.TRAILING, gl_panel_1.createSequentialGroup()
					.addContainerGap()
					.addComponent(list, GroupLayout.DEFAULT_SIZE, 165, Short.MAX_VALUE)
					.addPreferredGap(ComponentPlacement.UNRELATED)
					.addComponent(panel_2, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addContainerGap())
		);
		comboBox = new JComboBox(items);
		
		JButton btnTakePicture = new JButton("Take Picture");
		btnTakePicture.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fireTakePicture();
			}
		});
		GroupLayout gl_panel_2 = new GroupLayout(panel_2);
		gl_panel_2.setHorizontalGroup(
			gl_panel_2.createParallelGroup(Alignment.LEADING)
				.addGroup(Alignment.TRAILING, gl_panel_2.createSequentialGroup()
					.addContainerGap()
					.addGroup(gl_panel_2.createParallelGroup(Alignment.TRAILING)
						.addComponent(btnTakePicture, Alignment.LEADING, GroupLayout.DEFAULT_SIZE, 178, Short.MAX_VALUE)
						.addComponent(comboBox, Alignment.LEADING, 0, 178, Short.MAX_VALUE))
					.addContainerGap())
		);
		gl_panel_2.setVerticalGroup(
			gl_panel_2.createParallelGroup(Alignment.LEADING)
				.addGroup(gl_panel_2.createSequentialGroup()
					.addContainerGap()
					.addComponent(comboBox, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
					.addPreferredGap(ComponentPlacement.UNRELATED, GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
					.addComponent(btnTakePicture)
					.addGap(18))
		);
		panel_2.setLayout(gl_panel_2);
		panel_1.setLayout(gl_panel_1);
		setLayout(groupLayout);
	}
	
	private void fireTakePicture() {
		gui.fireTakePicture();
	}
	
	private void fireMouseClickedInList() {
		String title = (String) list.getSelectedValue();
		if(!lastTitle.equals(title)) {
			try {
				lastTitle = title;
				Image image = scaleImage(ImageIO.read(new File(title)), 560, 420);
				ImageIcon icon = new ImageIcon(image);
				imgLabel.setIcon(icon);
				repaint();
				validate();
			} catch (IOException e) {
			}
		}
	}
	
	public void updateImage(byte[] data) {
		try{
			String title = "download/" + (new Date(System.currentTimeMillis())).toString().replaceAll(" ", "_")+".jpeg";
			FileOutputStream out = new FileOutputStream(title);
			out.write(data);
			out.close();
			
			Image image = scaleImage(ImageIO.read(new File(title)), 560, 420);
			ImageIcon icon = new ImageIcon(image);
			imgLabel.setIcon(icon);
			repaint();
			validate();
			
			lastTitle = title;
			listAddr.add(title);
			list.setListData(listAddr.toArray());
			list.setSelectedValue(title, true);
			
		} catch(Exception e) {
			gui.errLogTxt(System.currentTimeMillis(), "Error in creating picture");
		}
	}
	
	public static Image scaleImage(Image source, int width, int height) {
        BufferedImage img = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = (Graphics2D) img.getGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.drawImage(source, 0, 0, width, height, null);
        g.dispose();
        return img;
    }
}

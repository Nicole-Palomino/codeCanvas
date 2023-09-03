from tkinter import *

ventana = Tk()
ventana.title("Calculadora con Tkinter V1.0")
ventana.iconbitmap('C:\\Users\\NICOLE\\Downloads\\RRSS\\codeCanvas\\calculadora-python\\icono.ico')

i = 0

e_texto = Entry(ventana, font = ("Arial 20"), bg='white', fg='black', borderwidth=3, relief="sunken")
e_texto.grid(row = 0, column = 0, columnspan = 4, padx = 5, pady = 5)
font_number = ('Arial', 20, 'bold')

def click_boton(valor):
	global i
	e_texto.insert(i, valor)
	i += 1

def borrar():
	e_texto.delete(0, END)
	i = 0

def hacer_operacion():
	ecuacion = e_texto.get()
	resultado = eval(ecuacion)
	e_texto.delete(0, END)
	e_texto.insert(0, resultado)
	i = 0  

boton1 = Button(ventana, text = "1", width= 3, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(1))
boton2 = Button(ventana, text = "2", width= 3, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(2))
boton3 = Button(ventana, text = "3", width= 3, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(3))
boton4 = Button(ventana, text = "4", width= 3, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(4))
boton5 = Button(ventana, text = "5", width= 3, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(5))
boton6 = Button(ventana, text = "6", width= 3, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(6))
boton7 = Button(ventana, text = "7", width= 3, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(7))
boton8 = Button(ventana, text = "8", width= 3, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(8))
boton9 = Button(ventana, text = "9", width= 3, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(9))
boton0 = Button(ventana, text = "0", width= 8, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(0))

boton_borrar = Button(ventana, text = "AC", width= 3, height = 1, bg='#1D5AFD', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: borrar())
boton_parentesis1 = Button(ventana, text = "(", width= 3, height = 1, bg='#d15a00', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton("("))
boton_parentesis2 = Button(ventana, text = ")", width= 3, height = 1, bg='#d15a00', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton(")"))
boton_punto = Button(ventana, text = ".", width= 3, height = 1, bg='#24221d', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton("."))

boton_div = Button(ventana, text = "/", width= 3, height = 1, bg='#d15a00', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton("/"))
boton_mult = Button(ventana, text = "x", width= 3, height = 1, bg='#d15a00', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton("*"))
boton_sum = Button(ventana, text = "+", width= 3, height = 1, bg='#d15a00', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton("+"))
boton_rest = Button(ventana, text = "-", width= 3, height = 1, bg='#d15a00', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: click_boton("-"))
boton_igual = Button(ventana, text = "=", width= 3, height = 1, bg='#d15a00', fg='white', font=font_number, borderwidth=3, relief="sunken", command = lambda: hacer_operacion())

boton_borrar.grid(row = 1, column = 0, padx = 3, pady = 3)
boton_parentesis1.grid(row = 1, column = 1, padx = 3, pady = 3)
boton_parentesis2.grid(row = 1, column = 2, padx = 3, pady = 3)
boton_div.grid(row = 1, column = 3, padx = 3, pady = 3)

boton7.grid(row= 2, column = 0, padx = 3, pady = 3)
boton8.grid(row= 2, column = 1, padx = 3, pady = 3)
boton9.grid(row= 2, column = 2, padx = 3, pady = 3)
boton_mult.grid(row= 2, column = 3, padx = 3, pady = 3)

boton4.grid(row= 3, column = 0, padx = 3, pady = 3)
boton5.grid(row= 3, column = 1, padx = 3, pady = 3)
boton6.grid(row= 3, column = 2, padx = 3, pady = 3)
boton_sum.grid(row= 3, column = 3, padx = 3, pady = 3)

boton1.grid(row= 4, column = 0, padx = 3, pady = 3)
boton2.grid(row= 4, column = 1, padx = 3, pady = 3)
boton3.grid(row= 4, column = 2, padx = 3, pady = 3)
boton_rest.grid(row= 4, column = 3, padx = 3, pady = 3)

boton0.grid(row= 5, column = 0, columnspan = 2, padx = 3, pady = 3)
boton_punto.grid(row= 5, column = 2, padx = 3, pady = 3)
boton_igual.grid(row= 5, column = 3, padx = 3, pady = 3)

ventana.mainloop()
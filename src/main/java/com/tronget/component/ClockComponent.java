package com.tronget.component;

import jakarta.faces.component.FacesComponent;
import jakarta.faces.component.UIComponentBase;
import jakarta.faces.context.FacesContext;
import jakarta.faces.context.ResponseWriter;

import java.io.IOException;

@FacesComponent(createTag = true, tagName = "clockComponent", namespace = "customComponents")
public class ClockComponent extends UIComponentBase {
    @Override
    public String getFamily() {
        return "custom.components";
    }

    @Override
    public void encodeBegin(FacesContext context) throws IOException {
        ResponseWriter writer = context.getResponseWriter();

        // Рендерим контейнер с заданным классом стилей
        writer.startElement("div", this);
        writer.writeAttribute("class", "clock", null);

        // Рендерим текст "Текущие дата и время:"
        writer.startElement("span", this);
        writer.writeText("Текущие дата и время: ", null);
        writer.endElement("span");

        // Рендерим пустой контейнер для часов
        writer.startElement("span", this);
        writer.writeAttribute("id", "clock", null);
        writer.endElement("span");

        writer.endElement("div");
    }
}
